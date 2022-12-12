import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#fd758c",
        },
        secondary: {
            main: "#3f2248",

        },
        action: {
            disabled: "#fff",
            disabledBackground: "#CFBEFF",
        },
    },

    typography: {
        h2: {
            fontFamily: "Lato', sans-serif"
        },
        h4: {
            fontFamily: "Poppins', sans-serif"
        },
        body2: {
            fontFamily: "Poppins', sans-serif"
        },
    },
    components: {
        MuiButton: {
            variants: [
                {
                    props: { variant: "contained" },
                    style: {
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "10px 20px",
                        gap: "10px",
                        // width: "100%",
                        height: "auto",
                        // borderRadius: "12px",
                        fontFamily: "Lato', sans-serif",
                        fontWeight: 600,
                        fontSize: "14px",
                        lineHeight: "20px",
                        textAlign: "center",
                        textTransform: "capitalize",
                        margin: "15px auto",

                    },
                },
            ],
        },
        MuiInputBase: {
            styleOverrides: {
                input: {
                    borderRadius: "8px",
                    maxHeight: "52px !important",
                    width: "100%",
                    // padding: "10px px !important",
                    border: "0 !important",
                    // boxShadow: "0px -4px 0px #cfbeff inset !important",
                    fontSize: "14px",
                    // zIndex: "-1",
                    "&::before": {
                        borderBottom: "none", // use your color
                    },
                },
                MuiFilledInput: {
                    boxShadow: "0px -4px 0px #eee inset !important",
                    padding: "20rem !important",
                },
            },
        },
    },
});

export default theme;