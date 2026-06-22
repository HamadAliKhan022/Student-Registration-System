import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Typography
} from "@mui/material";

export default function AuthLayout({
  title,
  subtitle,
  icon,
  children,
  footer
}) {
  return (
    <Box
      sx={{
        minHeight: "100dvh",
        display: "grid",
        placeItems: "center",
        px: 2,
        py: { xs: 3, sm: 5 },
        backgroundColor: "#F3F6F8",
        backgroundImage:
          "radial-gradient(circle at 12% 15%, rgba(105, 142, 168, 0.14), transparent 26%), radial-gradient(circle at 88% 85%, rgba(107, 140, 122, 0.14), transparent 28%)"
      }}
    >
      <Card
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 540,
          border: "1px solid rgba(103, 125, 141, 0.14)",
          boxShadow: "0 22px 55px rgba(36, 55, 70, 0.10)",
          overflow: "hidden"
        }}
      >
        <CardContent
          sx={{
            p: { xs: 3, sm: 4.5 },
            "&:last-child": {
              pb: { xs: 3, sm: 4.5 }
            }
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: 1.2
              }}
            >
              <Avatar
                variant="rounded"
                sx={{
                  width: 54,
                  height: 54,
                  bgcolor: "rgba(78, 112, 142, 0.12)",
                  color: "primary.main",
                  borderRadius: 3
                }}
              >
                {icon}
              </Avatar>

              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontSize: { xs: 27, sm: 31 }
                  }}
                >
                  {title}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.7 }}
                >
                  {subtitle}
                </Typography>
              </Box>
            </Box>

            {children}

            {footer && (
              <>
                <Divider
                  sx={{
                    borderColor: "rgba(103, 125, 141, 0.16)"
                  }}
                />

                <Box sx={{ textAlign: "center" }}>
                  {footer}
                </Box>
              </>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
