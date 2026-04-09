import React, { useRef } from 'react';
import { Typography, Box, Fade, TextField, Button, Stack, IconButton, Snackbar } from '@mui/material';
import { Facebook, Instagram, Twitter, YouTube } from '@mui/icons-material';
import emailjs from '@emailjs/browser';

function Contact() {
  const form = useRef();
  const [open, setOpen] = React.useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'your_service_id',
      'your_template_id',
      form.current,
      'your_public_key'
    )
    .then(() => {
      setOpen(true);
      form.current.reset();
    })
    .catch((error) => {
      console.error('Error:', error.text);
    });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: 'url("https://images.unsplash.com/photo-1600891964599-f61ba0e24092")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Fade in timeout={1000}>
        <Box
          sx={{
            p: 5,
            maxWidth: 500,
            width: '100%',
            borderRadius: '20px',
            backdropFilter: 'blur(12px)',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
            color: 'white',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              textShadow: '1px 1px 4px rgba(0,0,0,0.5)',
              animation: 'fadeIn 2s ease-in-out',
              '@keyframes fadeIn': {
                from: { opacity: 0, transform: 'translateY(-20px)' },
                to: { opacity: 1, transform: 'translateY(0)' },
              },
            }}
          >
            Contact Us
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mt: 2,
              fontSize: '1.1rem',
              transition: 'color 0.3s ease',
              '& a': {
                color: '#ffd700',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
                '&:hover': {
                  color: '#ffffff',
                },
              },
            }}
          >
            📧 Email us at:{' '}
            <a href="mailto:contact@foodiepk.com">contact@foodiepk.com</a>
          </Typography>

          <Box
            component="form"
            ref={form}
            onSubmit={sendEmail}
            sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <TextField name="name" label="Your Name" required InputProps={{ style: { color: 'white' } }} InputLabelProps={{ style: { color: 'white' } }} />
            <TextField name="email" label="Your Email" type="email" required InputProps={{ style: { color: 'white' } }} InputLabelProps={{ style: { color: 'white' } }} />
            <TextField name="message" label="Your Message" multiline rows={4} required InputProps={{ style: { color: 'white' } }} InputLabelProps={{ style: { color: 'white' } }} />
            <Button type="submit" variant="contained" sx={{ mt: 2, backgroundColor: '#ffd700', color: '#000', fontWeight: 'bold', '&:hover': { backgroundColor: '#ffcc00' } }}>
              Send Message
            </Button>
          </Box>

          <Stack direction="row" spacing={2} justifyContent="center" mt={4}>
            <IconButton href="#" sx={{ color: '#ffffff' }}><Facebook /></IconButton>
            <IconButton href="#" sx={{ color: '#ffffff' }}><Instagram /></IconButton>
            <IconButton href="#" sx={{ color: '#ffffff' }}><Twitter /></IconButton>
            <IconButton href="#" sx={{ color: '#ffffff' }}><YouTube /></IconButton>
          </Stack>

          <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={() => setOpen(false)}
            message="✅ Message sent successfully!"
          />
        </Box>
      </Fade>
    </Box>
  );
}

export default Contact;
