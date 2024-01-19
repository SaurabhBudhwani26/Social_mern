/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";


const ProfilePage = () => {
    const [user, setUser] = useState()
    const { userId } = useParams()
    const token = useSelector((state) => state.token)
    const isNonMoblieScreens = useMediaQuery("(min-width: 1000px)")


    const getUser = async () => {
        const response = await fetch(`http://localhost:5001/user/${userId}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

        const data = await response.json()
        setUser(data)
    }


    useEffect(()=>{
        getUser()
    },[])

    if (!user) return null

    return (
        <Box>
            <Navbar />
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMoblieScreens ? "flex" : "block" }
                gap="2rem"
                justifyContent="center" 
            >
            <Box flexBasis ={isNonMoblieScreens ? "26%" : undefined } >
                <UserWidget userId={userId} picturePath={user.picturePath} />
                <Box m="2rem 0"/>
                <FriendListWidget userId={userId} />
            </Box>
            <Box flexBasis ={isNonMoblieScreens ? "42%" : undefined } 
                mt = {isNonMoblieScreens ? undefined : "2rem" } 
            >
            <MyPostWidget picturePath={user.picturePath}/>
            <PostsWidget userId={userId} isProfile={true} />
            </Box>
            </Box>

        </Box>
    )
}

export default ProfilePage;
