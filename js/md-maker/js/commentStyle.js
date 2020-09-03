
function commentStyle(EXTENSION_CASE, e) {


    switch(EXTENSION_CASE) {
        case "yml":
        case "yaml":
        case "py":
        case "ps1":
        case "psm1":
        case "psc1":
        case "sh":
            hashStyle(EXTENSION_CASE, e)
            break
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
        
    }
}


/*

  htm     : web
  html    : web
  xml     : web
  cfm     : web   # cold fusion
  asm     : semicol   # assembler
  s       : semicol
  # bas     : rem   # basic
  # sql     : dashdash
  # ada     : dashdash




# Regex statements
  ## NOTES:
    # (?:) non-capturing group
    # [^>]* capture anything that isn't >
# Pull string quotes from python files
PY_STYLE      : "  \n{{ item | regex_findall('\"{3}(.*?)\"{3}') | join('  \n') }}  \n  \n  "
WEB_STYLE     : "  \n{{ item | regex_findall('(?:<!-\\W+|<!-\\W+\\n)([^>]*)(?:\\W+->|\\n\\W+->|\\W+\\n\\W+->)') | join('  \n') }}  \n  \n  "
# Pull meta from html files
META_STYLE    : "  \n{{ item | regex_findall('<meta(.+)>') | join('  \n') }}  \n  \n  "
SEMICOL_STYLE : "  \n{{ item | regex_findall(';\\W+(.+)') | join('  \n') }}  \n  \n  "
# FIX SINGLE QUOTE ISSUE FOR REM_STYLE
REM_STYLE     : "  \n{{ item | regex_findall('(?i)rem\\W+(.+)|(?:\\')(.+)') | join('  \n') }}  \n  \n  "

*/
