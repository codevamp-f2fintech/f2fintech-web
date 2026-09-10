import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Rating,
  Button,
  CircularProgress,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShareIcon from "@mui/icons-material/Share";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import API from "../../apis";
import { Utility } from "../utility";

const TestimonialPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { capitalizeFirstLetter, formatNameDr } = Utility();

  const [testimonial, setTestimonial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const serverBaseUrl =
    import.meta.env.VITE_BASE_URL?.replace("/api/v1", "") || "";

  useEffect(() => {
    API.RatingRevAPI.getRating()
      .then((res) => {
        const reviews = res?.data?.data?.reviews || [];
        const found = reviews.find(
          (r) => String(r.review_id || r.id) === String(id)
        );
        if (found) {
          setTestimonial(found);
        } else {
          setNotFound(true);
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  const isVideoUrl = (url) => {
    if (!url) return false;
    const lower = url.toLowerCase();
    return (
      lower.includes("drive.google.com") ||
      lower.includes("youtube.com") ||
      lower.includes("youtu.be") ||
      lower.includes("vimeo.com") ||
      lower.endsWith(".mp4") ||
      lower.endsWith(".webm")
    );
  };

  const getEmbedUrl = (url) => {
    if (!url) return "";
    if (url.includes("drive.google.com")) {
      const regExp =
        /(?:https?:\/\/)?(?:drive\.google\.com\/)(?:file\/d\/|open\?id=|uc\?id=)([^?\/&]+)/;
      const match = url.match(regExp);
      if (match && match[1]) {
        return `https://drive.google.com/file/d/${match[1]}/preview`;
      }
    }
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const regExp =
        /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([^?\/&]+)/;
      const match = url.match(regExp);
      if (match && match[1]) {
        return `https://www.youtube.com/embed/${match[1]}?autoplay=1`;
      }
    }
    if (url.includes("vimeo.com")) {
      const regExp = /(?:https?:\/\/)?(?:www\.)?vimeo\.com\/(\d+)/;
      const match = url.match(regExp);
      if (match && match[1]) {
        return `https://player.vimeo.com/video/${match[1]}?autoplay=1`;
      }
    }
    return url;
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/testimonial/${id}`;
    const reviewerName = testimonial?.name
      ? formatNameDr(testimonial.name)
      : "Customer";
    const shareData = {
      title: `${reviewerName}'s Testimonial | F2 Fintech`,
      text: `Check out ${reviewerName}'s testimonial on F2 Fintech: ${shareUrl}`,
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        if (err.name === "AbortError") return;
      }
    }

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = shareUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setSnackbarMessage("Testimonial link copied to clipboard!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch {
      setSnackbarMessage("Failed to copy link");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  // ─── Loading ────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #e8eeff 0%, #f0f4ff 100%)",
        }}
      >
        <CircularProgress sx={{ color: "#2438f0" }} size={56} />
      </Box>
    );
  }

  // ─── Not Found ───────────────────────────────────────────────────────────────
  if (notFound || !testimonial) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #e8eeff 0%, #f0f4ff 100%)",
          gap: 3,
          p: 4,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 700,
            color: "#1e293b",
          }}
        >
          Testimonial Not Found
        </Typography>
        <Typography
          sx={{ color: "#64748b", fontFamily: "Poppins", fontSize: "1.1rem" }}
        >
          This testimonial may have been removed or the link is invalid.
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/")}
          startIcon={<ArrowBackIcon />}
          sx={{
            bgcolor: "#2438f0",
            borderRadius: "50px",
            px: 4,
            py: 1.5,
            textTransform: "none",
            fontFamily: "Poppins",
            fontWeight: 600,
            "&:hover": { bgcolor: "#1a2bd0" },
          }}
        >
          Back to F2 Fintech
        </Button>
      </Box>
    );
  }

  const isVideo = isVideoUrl(testimonial.review);
  const reviewerName = formatNameDr(testimonial.name);
  const thumbnailSrc = testimonial.thumbnail?.startsWith("/uploads")
    ? `${serverBaseUrl}${testimonial.thumbnail}`
    : testimonial.thumbnail || "/new/dr.sunilkshastri.webp";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #dce5ff 0%, #eef2ff 40%, #f8faff 100%)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ── Top bar ─────────────────────────────────────────────────── */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: { xs: 2, sm: 4 },
          py: 2,
          background: "rgba(255,255,255,0.7)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(36,56,240,0.08)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <Button
          onClick={() => navigate("/")}
          startIcon={<ArrowBackIcon />}
          sx={{
            textTransform: "none",
            fontFamily: "Poppins",
            fontWeight: 600,
            color: "#2438f0",
            fontSize: "0.9rem",
            "&:hover": { background: "rgba(36,56,240,0.07)" },
          }}
        >
          F2 Fintech
        </Button>

        <Tooltip title="Share this testimonial" arrow>
          <IconButton
            onClick={handleShare}
            sx={{
              bgcolor: "#f1f5f9",
              color: "#475569",
              "&:hover": {
                bgcolor: "#2438f0",
                color: "#fff",
                transform: "scale(1.08)",
              },
              transition: "all 0.2s",
            }}
          >
            <ShareIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {/* ── Main content ────────────────────────────────────────────── */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: { xs: 4, md: 8 },
          px: 2,
        }}
      >
        <Container maxWidth="md">
          {/* Label */}
          <Typography
            sx={{
              textAlign: "center",
              fontFamily: "Poppins",
              fontWeight: 600,
              fontSize: "0.8rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#2438f0",
              mb: 2,
              opacity: 0.8,
            }}
          >
            Client Testimonial
          </Typography>

          {/* Card */}
          <Box
            sx={{
              background: "#ffffff",
              borderRadius: { xs: "20px", md: "28px" },
              overflow: "hidden",
              boxShadow: "0 24px 80px rgba(36, 56, 240, 0.15)",
              border: "1px solid rgba(36,56,240,0.08)",
            }}
          >
            {/* ── Video testimonial ─── */}
            {isVideo && (
              <>
                <Box
                  sx={{
                    position: "relative",
                    paddingTop: "56.25%",
                    width: "100%",
                    bgcolor: "#000",
                  }}
                >
                  <iframe
                    src={getEmbedUrl(testimonial.review)}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      border: "none",
                    }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                    allowFullScreen
                    title={`${reviewerName}'s Testimonial`}
                  />
                </Box>
                <Box
                  sx={{
                    p: { xs: 3, md: 4 },
                    textAlign: "center",
                    borderTop: "1px solid #f1f5f9",
                  }}
                >
                  <Rating
                    value={Number.parseInt(testimonial.rating) || 0}
                    readOnly
                    precision={0.5}
                    sx={{
                      mb: 1.5,
                      "& .MuiRating-iconFilled": { color: "#fdb723" },
                    }}
                  />
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: "Poppins",
                      fontWeight: 700,
                      color: "#1e293b",
                      mb: 0.5,
                    }}
                  >
                    {reviewerName}
                  </Typography>
                  {testimonial.city && (
                    <Typography
                      sx={{
                        fontFamily: "Poppins",
                        fontWeight: 500,
                        color: "#64748b",
                        fontSize: "0.95rem",
                      }}
                    >
                      {capitalizeFirstLetter(testimonial.city)}
                    </Typography>
                  )}
                </Box>
              </>
            )}

            {/* ── Text testimonial ─── */}
            {!isVideo && (
              <Box
                sx={{
                  p: { xs: 3, sm: 5, md: 7 },
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 3,
                }}
              >
                {/* Avatar */}
                <Box
                  sx={{
                    width: { xs: 72, md: 90 },
                    height: { xs: 72, md: 90 },
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "3px solid #e0e7ff",
                    boxShadow: "0 4px 20px rgba(36,56,240,0.15)",
                  }}
                >
                  <img
                    src={thumbnailSrc}
                    alt={reviewerName}
                    loading="eager"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>

                {/* Quote icon */}
                <Typography
                  sx={{
                    fontSize: { xs: "3rem", md: "4rem" },
                    lineHeight: 1,
                    color: "#2438f0",
                    opacity: 0.15,
                    fontFamily: "Georgia, serif",
                    mt: -1,
                  }}
                >
                  ❝
                </Typography>

                {/* Review text */}
                <Typography
                  sx={{
                    fontSize: { xs: "1.05rem", sm: "1.2rem", md: "1.35rem" },
                    fontStyle: "italic",
                    fontWeight: 500,
                    color: "#334155",
                    fontFamily: "DM Sans, Poppins, sans-serif",
                    lineHeight: 1.8,
                    textAlign: "center",
                    maxWidth: "680px",
                  }}
                >
                  {testimonial.review}
                </Typography>

                {/* Divider */}
                <Box
                  sx={{
                    width: 60,
                    height: 3,
                    borderRadius: "2px",
                    background:
                      "linear-gradient(135deg, #2438f0 0%, #4763ff 100%)",
                    mt: 1,
                  }}
                />

                {/* Rating */}
                <Rating
                  value={Number.parseInt(testimonial.rating) || 0}
                  readOnly
                  precision={0.5}
                  sx={{
                    "& .MuiRating-iconFilled": { color: "#fdb723" },
                    "& .MuiRating-icon": { fontSize: "1.8rem" },
                  }}
                />

                {/* Name */}
                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: "Poppins",
                      fontWeight: 700,
                      color: "#1e293b",
                      fontSize: { xs: "1.2rem", md: "1.4rem" },
                    }}
                  >
                    {reviewerName}
                  </Typography>
                  {testimonial.city && (
                    <Typography
                      sx={{
                        fontFamily: "Poppins",
                        fontWeight: 500,
                        color: "#64748b",
                        fontSize: "0.95rem",
                        mt: 0.5,
                      }}
                    >
                      {capitalizeFirstLetter(testimonial.city)}
                    </Typography>
                  )}
                </Box>
              </Box>
            )}
          </Box>

          {/* ── CTA Section ─────────────────────────────────────────── */}
          <Box
            sx={{
              mt: 5,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontWeight: 600,
                fontSize: { xs: "1rem", md: "1.15rem" },
                color: "#475569",
              }}
            >
              Ready to experience the F2 Fintech difference?
            </Typography>

            <Box
              sx={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center" }}
            >
              <Button
                variant="contained"
                onClick={() => navigate("/")}
                endIcon={<OpenInNewIcon />}
                sx={{
                  background:
                    "linear-gradient(135deg, #2438f0 0%, #4763ff 100%)",
                  color: "#fff",
                  borderRadius: "50px",
                  px: { xs: 3, md: 4 },
                  py: 1.5,
                  textTransform: "none",
                  fontFamily: "Poppins",
                  fontWeight: 600,
                  fontSize: "1rem",
                  boxShadow: "0 8px 24px rgba(36,56,240,0.3)",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #1a2bd0 0%, #3652e0 100%)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 12px 32px rgba(36,56,240,0.4)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Explore F2 Fintech
              </Button>

              <Button
                variant="outlined"
                onClick={() => navigate("/application-form")}
                sx={{
                  borderColor: "#2438f0",
                  color: "#2438f0",
                  borderRadius: "50px",
                  px: { xs: 3, md: 4 },
                  py: 1.5,
                  textTransform: "none",
                  fontFamily: "Poppins",
                  fontWeight: 600,
                  fontSize: "1rem",
                  "&:hover": {
                    bgcolor: "rgba(36,56,240,0.06)",
                    borderColor: "#1a2bd0",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Apply Now
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ── Footer strip ────────────────────────────────────────────── */}
      <Box
        sx={{
          py: 2,
          textAlign: "center",
          borderTop: "1px solid rgba(36,56,240,0.08)",
          background: "rgba(255,255,255,0.6)",
          backdropFilter: "blur(8px)",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontSize: "0.8rem",
            color: "#94a3b8",
            fontWeight: 500,
          }}
        >
          © F2 Fintech · All rights reserved
        </Typography>
      </Box>

      {/* ── Snackbar ────────────────────────────────────────────────── */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          variant="filled"
          sx={{
            width: "100%",
            borderRadius: "12px",
            fontFamily: "Poppins",
            fontWeight: 500,
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TestimonialPage;
