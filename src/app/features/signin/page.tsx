"use client";

// ログインページ
import { useState } from "react";
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import Link from "next/link";
const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Todo: ログイン処理を実装する
  const signin = () => {
    router.push("/auth/signin");
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
            onClick={signin}
          >
            ログイン
          </Button>
          <div className="text-center pt-6">
            <Link href="/features/signup" className="text-black underline">
              新規登録
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
