
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

    }
}


/*
EXTENSION_CASE:
  yml     : hash
  yaml    : hash
  py      : hash  # python
  ps1     : hash  # powershell
  psm1    : hash
  psc1    : hash
  sh      : hash  # shell / bash
  htm     : web
  html    : web
  xml     : web
  cfm     : web   # cold fusion
  cpp     : slash
  c++     : slash
  c       : slash
  java    : slash
  j       : slash
  j++     : slash
  js      : slash
  go      : slash
  swift   : slash
  asm     : semicol   # assembler
  s       : semicol
  # bas     : rem   # basic
  # sql     : dashdash
  # ada     : dashdash




# Regex statements
  ## NOTES:
    # (?:) non-capturing group
    # [^>]* capture anything that isn't >
SLASH_STYLE   : "  \n{{ item | regex_findall('(?:\\/(?=\\*)\\W+|\\/(?=\\*\\n))([^`]+?)(?:\\*(\\/))|(?:\\/(?=\\/)\\W+(.+)\\n)') | join('  \n') }}  \n  \n  "
# Pull string quotes from python files
PY_STYLE      : "  \n{{ item | regex_findall('\"{3}(.*?)\"{3}') | join('  \n') }}  \n  \n  "
WEB_STYLE     : "  \n{{ item | regex_findall('(?:<!-\\W+|<!-\\W+\\n)([^>]*)(?:\\W+->|\\n\\W+->|\\W+\\n\\W+->)') | join('  \n') }}  \n  \n  "
# Pull meta from html files
META_STYLE    : "  \n{{ item | regex_findall('<meta(.+)>') | join('  \n') }}  \n  \n  "
SEMICOL_STYLE : "  \n{{ item | regex_findall(';\\W+(.+)') | join('  \n') }}  \n  \n  "
# FIX SINGLE QUOTE ISSUE FOR REM_STYLE
REM_STYLE     : "  \n{{ item | regex_findall('(?i)rem\\W+(.+)|(?:\\')(.+)') | join('  \n') }}  \n  \n  "

*/
