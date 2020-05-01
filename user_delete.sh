#!/bin/bash

# don't forget to chmod +x <this filename> to make it executable  
# have to launch with "sudo" to delete user - 
# $ sudo ./user_delete.sh <user>  

if id "$1" > /dev/null 2>&1;  then
    echo "\"$1\" : \"found\""
    read -p "Delete $1? (y/n)"  answer
        case ${answer:0:1}  in
            n|N )
                echo No
                echo "we'll get em next time..."
            ;;
            y|Y )
                echo Yes
                echo "\"$1\" : \"locking\""
                passwd -l $1
                echo "\"$1\" : \"killall\""
                killall -KILL -u $1
                echo "\"$1\" : \"crontab\""
                crontab -r -u $1
                echo "\"$1\" : \"deleting\""
                userdel -r $1
                echo "\"$1\" : \"missing\""
            ;;
        esac
else
    echo "\"$1\" : \"missing\""
fi

