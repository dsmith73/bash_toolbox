#!/bin/bash

# -DANGER-
# this creates a user, adds them to sudoer, and sets their password the same as their username  
# only use this for testing purposes!  

# don't forget to make it executable  
# chmod +x user_add.sh  
# have to launch with "sudo" to create user - 
# sudo ./user_add.sh <user>  


if id "$1" > /dev/null 2>&1;  then
    echo "\"$1\" : \"found\""
else
    echo "\"$1\" : \"missing\""

    read -p "Setup $1? (y/n)"  answer
        case ${answer:0:1}  in
            n|N )
                echo No
                echo "bye"
            ;;
            y|Y )
                echo Yes
                echo "\"$1\" : \"creating\""
                sudo useradd -c "sudo User - $1" -m $1
                echo "\"$1\" : \"sudo\""
                echo $1' ALL=(ALL) NOPASSWD: ALL' >> /etc/sudoers
                echo "\"$1\" : \"password\""
                echo $1:$1 | chpasswd
            ;;
        esac
fi

