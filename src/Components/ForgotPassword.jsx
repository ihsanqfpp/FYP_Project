import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import {
  TextField,
  Button,
  Alert,
  CircularProgress,
  Typography,
  Box,
  InputAdornment,
  useTheme
} from "@mui/material";
import { motion } from "framer-motion";
import AuthLayout from "./AuthLayout";

const ForgotPassword = () => {
  const location = useLocation();
  const passedEmail = location.state?.email || "";
  const [email, setEmail] = useState(passedEmail);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Check your inbox.");
    } catch (err) {
      setError("Email not found or invalid. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Reset Your Password">
      <form onSubmit={handleReset}>
        {message && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {message}
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Typography variant="body1" sx={{ mb: 3, textAlign: 'center' }}>
          Enter your email address and we'll send you a link to reset your password.
        </Typography>

        <TextField
          label="Email Address"
          type="email"
          fullWidth
          margin="normal"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          sx={{ mb: 3 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Typography color="text.secondary">✉️</Typography>
              </InputAdornment>
            ),
          }}
        />

        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            disabled={loading}
            sx={{
              py: 1.5,
              borderRadius: '10px',
              fontWeight: 600,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Send Reset Link"}
          </Button>
        </motion.div>

        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography
            variant="body2"
            sx={{
              color: 'primary.main',
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' },
              cursor: 'pointer'
            }}
            component={Link}
            to="/login"
          >
            Back to login
          </Typography>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default ForgotPassword;
