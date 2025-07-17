
import { Box, CircularProgress, Typography } from "@mui/material";

interface FullPageLoaderProps {
  text?: string;
  size?: number;
  thickness?: number;
  color?: "primary" | "secondary" | "error" | "inherit" | "success" | "warning" | "info";
}

const FullPageLoader = ({
  text,
  size = 60,
  thickness = 5,
  color = "primary",
}: FullPageLoaderProps) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <CircularProgress size={size} thickness={thickness} color={color} />
      {text && (
        <Typography mt={2} variant="h6" color="textSecondary">
          {text}
        </Typography>
      )}
    </Box>
  );
};

export default FullPageLoader;
