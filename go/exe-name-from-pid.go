 package main

 import (
 	"errors"
 	"fmt"
 	ps "github.com/mitchellh/go-ps"
 	"os"
 	"runtime"
 	"strconv"
 	"syscall"
 )

 // check if the process is actually running
 // However, on Unix systems, os.FindProcess always succeeds and returns
 // a Process for the given pid...regardless of whether the process exists
 // or not.
 func getProcessRunningStatus(pid int) (*os.Process, error) {
 	proc, err := os.FindProcess(pid)
 	if err != nil {
 		return nil, err
 	}

 	//double check if process is running and alive
 	//by sending a signal 0
 	//NOTE : syscall.Signal is not available in Windows

 	err = proc.Signal(syscall.Signal(0))
 	if err == nil {
 		return proc, nil
 	}

 	if err == syscall.ESRCH {
 		return nil, errors.New("process not running")
 	}

 	// default
 	return nil, errors.New("process running but query operation not permitted")
 }

 func main() {

 	if len(os.Args) != 2 {
 		fmt.Printf("Usage : %s processID \n ", os.Args[0]) // return the program name back to %s
 		os.Exit(1)                                         // graceful exit
 	}

 	pid, err := strconv.Atoi(os.Args[1])

 	if err != nil {
 		fmt.Println("Bad process ID supplied")
 		os.Exit(-1)
 	}

 	//NOTE : syscall.Signal is not available in Windows
 	if runtime.GOOS != "windows" {
 		_, err := getProcessRunningStatus(int(pid))

 		if err != nil {
 			fmt.Println("Error : ", err)
 			os.Exit(-1)
 		}

 	}

 	// at this stage the Processes related functions found in Golang's OS package
 	// is no longer sufficient, we will use Mitchell Hashimoto's https://github.com/mitchellh/go-ps
 	// package to find the application/executable/binary name behind the process ID.

 	p, err := ps.FindProcess(pid)

 	if err != nil {
 		fmt.Println("Error : ", err)
 		os.Exit(-1)
 	}

 	fmt.Println("Process ID : ", p.Pid())
 	fmt.Println("Parent Process ID : ", p.PPid())
 	fmt.Println("Process ID binary name : ", p.Executable())

 }
 
