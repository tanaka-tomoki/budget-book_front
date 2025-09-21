"use client";

// ログインページ
import { useState } from "react";
import { Button, TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { API_ENDPOINTS } from "@/utils/constants/APIendpoints";
import api from "@/utils/client";
import { AxiosError, AxiosResponse } from "axios";
const Signup = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Todo: ログイン処理を実装する
  const signup = async () => {
    const data = {
      userName: userName,
      password: password,
    };
    await api
      .post(API_ENDPOINTS.AUTH.SIGNUP, data)
      .then((response: AxiosResponse) => {
        const { data, status } = response;
        console.log("実行結果", data);
      })
      .finally(() => {
        console.log("通信結果");
      });
  };
  return (
    <>
      {/*タイトル*/}
      <div className="bb-box title-content pt-36">
        {/* タイトル名と画像 */}
        <div className="">
          <p>
            <span className="font-bold text-4xl text-black">Budget</span>
            <span className="font-bold text-4xl text-[#FF8C00]">Book</span>
          </p>
          <img src={"/images/logo.png"} />
        </div>
        {/* 入力エリア */}
        <div className="pt-10 flex flex-col">
          <TextField
            label="ID"
            variant="filled"
            margin="normal"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            sx={{
              width: "245px",
              height: "53px",
              background: "#ffffff",
              boxShadow: "2px 5px 5px gray",
              borderRadius: "5px",
            }}
          />
          <TextField
            label="Pass"
            variant="filled"
            margin="normal"
            type={showPassword ? "text" : "password"}
            sx={{
              width: "245px",
              height: "53px",
              background: "#ffffff",
              boxShadow: "2px 5px 5px gray",
              borderRadius: "5px",
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onMouseDown={() => setShowPassword(true)}
                    onMouseUp={() => setShowPassword(false)}
                    onMouseLeave={() => setShowPassword(false)}
                    onTouchStart={() => setShowPassword(true)}
                    onTouchEnd={() => setShowPassword(false)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Pass(確認)"
            variant="filled"
            margin="normal"
            sx={{
              width: "245px",
              height: "53px",
              background: "#ffffff",
              boxShadow: "2px 5px 5px gray",
              borderRadius: "5px",
            }}
          />
        </div>
        {/* ボタンエリア */}
        <div className="pt-10 flex flex-col">
          <Button
            sx={{
              background: "#FF8C00",
              width: "245px",
              height: "53px",
              color: "#ffffff",
              boxShadow: "2px 5px 5px gray",
              borderRadius: "5px",
              fontSize: "20px",
            }}
            onClick={signup}
          >
            新規登録
          </Button>
          <div className="text-center pt-6">
            <a href="/features/signin" className="text-black underline">
              ログイン画面へ
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
export default Signup;
