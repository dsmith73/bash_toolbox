# password generator  

VARS  
  - Number of characters  

Requirements:  
  - Will always make the first character a letter  
  - Will only include symbols: . ? , : [ ] { } = + * $ # @ !  
  - Will include lower case letters, uppercase letters, numbers, and sympols  
  - Will randomly create the output  
    - first letter + random array


Future DEV: IF submitted length < 6 OR > 100 - output message  

---  

Example 1:  
>Endpoint https://password.com/index.html results in a default pasword of length 11  
```
a10T9hqT7c}

o!08!J!5,!1

uw.Y?p3*Y85
```

Example 2:  
> Addind a query string of `?length=38` onto the endpoint https://password.com/index.html?length=38 provides a passsword of 38 characters  
```
a5OO9EI*,J=e*1[=3*+,]*,}{1{23{3.}6[]Y7

x*9R0#45@D?*+x0@hP7]3Pm@23K6Ea,kIt62E0

j,@.T@7O2zV@Wtp2x.D4O7,6?22#78A9m18[04
```





