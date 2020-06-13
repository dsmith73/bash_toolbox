package strutil

func Reverse(s string) string {
	// package to reverse a supplied string
	// e.g. pass hello & get olleh back
	runes := []rune(s)
	for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {
		runes[i], runes[j] = runes[j], runes[i]
	}
	return string(runes)
}
