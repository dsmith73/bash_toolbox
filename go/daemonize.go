 package main

 import (
         "fmt"
         "io/ioutil"
         "log"
         "net/http"
         "os"
         "runtime"
         "strconv"
         "strings"
         "syscall"
 )

 var PIDFile = "/tmp/daemonize.pid"

 func savePID(pid string) {

         file, err := os.Create(PIDFile)
         if err != nil {
                 log.Printf("Unable to create pid file : %v\n", err)
                 os.Exit(1)
         }

         defer file.Close()

         _, err = file.WriteString(pid)

         if err != nil {
                 log.Printf("Unable to create pid file : %v\n", err)
                 os.Exit(1)
         }

         file.Sync() // flush to disk

 }

 func daemonize(stdin, stdout, stderr string) {

         var ret, ret2 uintptr
         var syserr syscall.Errno

         darwin := runtime.GOOS == "darwin"

         // already a daemon
         if syscall.Getppid() == 1 {
                 fmt.Println("Already a daemon.")
                 os.Exit(1)
         }

         // detaches from the parent process
         // Golang does not have os.Fork()...
         // so we will use syscall.SYS_FORK

         // ret is the child process ID
         ret, ret2, syserr = syscall.RawSyscall(syscall.SYS_FORK, 0, 0, 0)
         if syserr != 0 {
                 fmt.Println("syscall.SYS_FORK error number: %v", syserr)
                 os.Exit(1)
         }

         // failure
         if ret2 < 0 {
                 fmt.Println("syscall.SYS_FORK failed")
                 os.Exit(-1)
         }

         // handle exception for darwin
         if darwin && ret2 == 1 {
                 ret = 0
         }

         // if we got a good PID, then we save the child process ID
         // to /tmp/daemonize.pid
         // and exit the parent process.
         if ret > 0 {
                 log.Println("Detached process from parent. Child process ID is  : ", ret)

                 // convert uintptr(pointer) value to string
                 childPID := fmt.Sprint(ret)
                 savePID(childPID)

                 os.Chdir("/")

                 // replace file descriptors for stdin, stdout and stderr
                 // default value is /dev/null

                 infile, err := os.OpenFile(stdin, os.O_RDWR, 0)
                 if err == nil {
                         infileDescriptor := infile.Fd()
                         syscall.Dup2(int(infileDescriptor), int(os.Stdin.Fd()))
                 }

                 // remove the output files
                 os.Remove(stdout)
                 os.Remove(stderr)

                 // with correct permissions
                 outfile, err := os.OpenFile(stdout, os.O_WRONLY|os.O_CREATE|os.O_EXCL, 0600)
                 if err == nil {
                         outfileDescriptor := outfile.Fd()
                         syscall.Dup2(int(outfileDescriptor), int(os.Stdout.Fd()))
                 }

                 errfile, err := os.OpenFile(stderr, os.O_WRONLY|os.O_CREATE|os.O_EXCL, 0600)
                 if err == nil {
                         errfileDescriptor := errfile.Fd()
                         syscall.Dup2(int(errfileDescriptor), int(os.Stderr.Fd()))
                 }

                 // debug
                 //syscall.Write(int(outfile.Fd()), []byte("test output to outfile.\n"))
                 //syscall.Write(int(os.Stdout.Fd()), []byte("test output to os.Stdout.\n"))

                 os.Exit(0)

                 // debug
                 // will not work after os.Exit(0)
                 //syscall.Write(int(os.Stdout.Fd()), []byte("test output to os.Stdout after os.Exit.\n"))
         }

         // Change the file mode mask
         _ = syscall.Umask(0)

         // create a new SID for the child process(relinquish the session leadership)
         // i.e we do not want the child process to die after the parent process is killed
         // see http://unix.stackexchange.com/questions/240646/why-we-use-setsid-while-daemonizing-a-process
         // just for fun, try commenting out the Setsid() lines and run this program. The daemonized child will die
         // together with the parent process.

         s_ret, s_errno := syscall.Setsid()
         if s_errno.Error() != strconv.Itoa(0) {
                 log.Printf("Error: syscall.Setsid errno: %d", s_errno)
                 // we already exit the program....
         }

         if s_ret < 0 {
                 log.Printf("Error: Unable to set new SID")
                 // we already exit the program....
         }

 }

 func main() {
         if len(os.Args) != 2 {
                 fmt.Printf("Usage : %s [start|stop] \n ", os.Args[0]) // return the program name back to %s
                 os.Exit(0)                                            // graceful exit
         }

         if strings.ToLower(os.Args[1]) == "start" {

                 // check if daemon already running.
                 if _, err := os.Stat(PIDFile); err == nil {
                         fmt.Println("Already running or /tmp/daemonize.pid file exist.")
                         os.Exit(1)
                 }

                 daemonize("/dev/null", "/tmp/daemonize.log", "/tmp/daemonize.log")

         }

         // upon receiving the stop command
         // read the Process ID stored in PIDfile
         // kill the process using the Process ID
         // and exit. If Process ID does not exist, prompt error and quit

         if strings.ToLower(os.Args[1]) == "stop" {
                 if _, err := os.Stat(PIDFile); err == nil {
                         data, err := ioutil.ReadFile(PIDFile)
                         if err != nil {
                                 fmt.Println("Not running")
                                 os.Exit(1)
                         }
                         ProcessID, err := strconv.Atoi(string(data))

                         if err != nil {
                                 fmt.Println("Unable to read and parse process id found in ", PIDFile)
                                 os.Exit(1)
                         }

                         process, err := os.FindProcess(ProcessID)

                         if err != nil {
                                 fmt.Printf("Unable to find process ID [%v] with error %v \n", ProcessID, err)
                                 os.Exit(1)
                         }
                         // remove PID file
                         os.Remove(PIDFile)

                         fmt.Printf("Killing process ID [%v] now.\n", ProcessID)
                         // kill process and exist immediately
                         err = process.Kill()

                         if err != nil {
                                 fmt.Printf("Unable to kill process ID [%v] with error %v \n", ProcessID, err)
                                 os.Exit(1)
                         } else {
                                 fmt.Printf("Killed process ID [%v]\n", ProcessID)
                                 os.Exit(0)
                         }

                 } else {

                         fmt.Println("Not running.")
                         os.Exit(1)
                 }
         } else {
                 fmt.Printf("Unknown command : %v\n", os.Args[1])
                 fmt.Printf("Usage : %s [start|stop]\n", os.Args[0]) // return the program name back to %s
                 os.Exit(1)
         }

 }
 
