const env = {
    GOOGLE_CLIENT_ID : "",
    BACKEND_URL : ""
}

env.GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID
env.BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export default env