export const getCookie = (name: string): string | undefined => {
	let matches = document.cookie.match(
		new RegExp(
			"(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1") + "=([^;]*)"
		)
	);
	return matches ? decodeURIComponent(matches[1]) : undefined;
};
export const setCookie = (name: string, value: any, maxAge?: number) => {
	let updatedCookie =
		encodeURIComponent(name) + "=" + encodeURIComponent(value);

	if (maxAge !== undefined) updatedCookie += `; max=age=${maxAge}`;

	document.cookie = updatedCookie;
};

export const deleteCookie = (name: string): void => {
	setCookie(name, "", 0);
};
