// This module checks if device is a mobile device through the user agent
const isMobile = /iPhone|iPad|iPod|Android|Mobi/i.test(navigator.userAgent)

export default isMobile