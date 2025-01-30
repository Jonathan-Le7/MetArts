import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "./firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import img from './assets/saved.jpg';

export function SavedDraw({ refresh }) {
  const [savedImages, setSavedImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchSavedImages = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        alert("Please log in to view your saved images.");
        setLoading(false);
        return;
      }

      const userId = user.uid;
      const imageRef = collection(db, `users/${userId}/images`);
      const snap = await getDocs(imageRef);
      const images = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSavedImages(images);
    } catch (error) {
      console.error("Error fetching images: ", error);
      alert("Failed to fetch images.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedImages();
  }, [refresh]);

  if (loading) {
    return <p>Loading saved images...</p>;
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString(undefined, options);
    const formattedTime = date.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
    });
    return `${formattedDate}\n${formattedTime}`;
  };

  const handleImageClick = (imageData) => {
    navigate('/Drawing', { state: { imageData } });
  };

  return (
    <div style={{
      textAlign: 'center',
      padding: '50px',
      background: `url("${img}") no-repeat center center fixed`,
      backgroundSize: 'cover',
      minHeight: '100vh'
    }}>
      <h5>Saved Images</h5>
      {savedImages.length === 0 ? (
        <p>No saved images found.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "10px",
            overflowY: "auto",
            height: "480px",
            paddingRight: "10px",
          }}
        >
          {savedImages.map((image) => (
            <div
              key={image.id}
              style={{
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <img
                src={image.imageData}
                alt="Saved Drawing"
                style={{
                  width: "150px",
                  height: "150px",
                  cursor: "pointer",
                  borderRadius: "10px",
                  border: "2px solid #777",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onClick={() => handleImageClick(image.imageData)}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.1)";
                  e.currentTarget.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.3)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
              <p
                style={{
                  fontSize: "16px",
                  fontFamily: "Arial, sans-serif",
                  fontWeight: "bold",
                  whiteSpace: "pre-wrap",
                  marginTop: "5px",
                  color: "white",
                }}
              >
                {formatDate(image.timestamp)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
