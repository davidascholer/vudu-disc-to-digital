const filterError = err => {
    if (err)
        return { error: err };
    if (!window.navigator.onLine)
        return { error: "No Internet Connection" }
    else
        return { error: "Network Error" };
}

export default filterError;