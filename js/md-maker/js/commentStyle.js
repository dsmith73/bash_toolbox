
function commentStyle(EXTENSION_CASE, e) {
    switch(EXTENSION_CASE) {
        //  Hash style comments  
        // Languages: Bourne shell and other UNIX shells, Cobra, Perl, Python, Ruby, Seed7, Windows PowerShell, PHP, R, Make, Maple, Elixir, Nim  
        case "yml":
        case "yaml":
        case "py":
        case "ps1":
        case "psm1":
        case "psc1":
        case "sh":
            hashStyle(EXTENSION_CASE, e)
            break
        //  Slash style comments  
        // Languages: ActionScript, C (C99), C++, C#, D, F#, Go, Java, JavaScript, Kotlin, Object Pascal (Delphi), Objective-C, PHP, Rust, Scala, SASS, Swift, Xojo  
        case "cpp":
        case "c++":
        case "c":
        case "java":
        case "j":
        case "j++":
        case "js":
        case "go":
        case "ts":
        case "tsx":
        case "swift":
          slashStyle(EXTENSION_CASE, e)
          break
        //  Web style comments  
        // Languages: 
        case "htm":
        case "html":
        case "xml":
        case "cfm":
          webStyle(EXTENSION_CASE, e)
          break
        //  Semicolon style comments  
        // Languages: Assembly x86, AutoHotkey, AutoIt, Lisp, Common Lisp, Clojure, Rebol, Red, Scheme  
        case "asm":
        case "s":
          semicolStyle(EXTENSION_CASE, e)
          break
        //  REM style comments  
        // Languages: BASIC, Batch files  

        //  Dash style comments  
        // Languages: Euphoria, Haskell, SQL, Ada, AppleScript, Eiffel, Lua, VHDL, SGML, PureScript  

    }
}


/*
  # bas     : rem   # basic
  # sql     : dashdash
  # ada     : dashdash

# Regex statements
  ## NOTES:
    # (?:) non-capturing group
    # [^>]* capture anything that isn't >
# Pull string quotes from python files

# FIX SINGLE QUOTE ISSUE FOR REM_STYLE
REM_STYLE     : "  \n{{ item | regex_findall('(?i)rem\\W+(.+)|(?:\\')(.+)') | join('  \n') }}  \n  \n  "

*/
