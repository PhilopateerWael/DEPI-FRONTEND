import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import api from "../Api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../store/slices/authSlice";

const GoogleLoginButton = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    function onSuccess(codeResponse: CredentialResponse) {
        api.post("/auth/google", { code: codeResponse.credential })
            .then(res => {
                const user = res.data.user;
                dispatch(auth(user))
                navigate("/");
            })
            .catch(e => {
                const msg =
                    e?.response?.data?.message ||
                    "Something went wrong";
                alert(msg);
            });
    }

    function onError() {
        alert("Error logging in with google");
    }

    return (
        <div className="google-wrapper w-full justify-center flex">
            <GoogleLogin
                onSuccess={onSuccess}
                onError={onError}
            />
        </div>
    );
};

export default GoogleLoginButton;
