import Navbar from "scenes/navbar";
import { useSelector } from "react-redux";
import { Box, useMediaQuery } from "@mui/material";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";

const HomePage = () => {
    const isNonMobileSceens = useMediaQuery("(min-width: 1000px)")
    const {_id, picturePath } = useSelector((state) => state.user)
    console.log(picturePath)
    return (
        <Box>
            <Navbar />
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileSceens ? "flex" : "block" }
                gap="0.5rem"
                justifyContent="space-between" 
            >
            <Box flexBasis ={isNonMobileSceens ? "26%" : undefined } >
                <UserWidget userId={_id} picturePath={picturePath} />
            </Box>
            <Box flexBasis ={isNonMobileSceens ? "42%" : undefined } 
                mt = {isNonMobileSceens ? undefined : "2rem" } 
            >
            <MyPostWidget picturePath={picturePath}/>
            </Box>
            {isNonMobileSceens && (<Box flexBasis="26%"></Box>)}
            </Box>
        </Box>
    )
}

export default HomePage;
