import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "./firebase";
import { useEffect, useState } from "react";

export function SavedDrawColumn({ onImageSelect, refresh }) {
  const [savedImages, setSavedImages] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div style={{ margin: "20px" }}>
      <h5>Saved Images</h5>
      {savedImages.length === 0 ? (
        <p>No saved images found.</p>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column", // Stack the images vertically
            overflowY: "auto", // Enable vertical scrolling
            height: "480px", // Set a fixed height to show only 4 images at once (100px per image)
            paddingRight: "10px", // Add some padding to avoid images being cut off
          }}
        >
          {savedImages.slice(0, 4).map((image) => (
            <div
              key={image.id}
              style={{
                textAlign: "center",
                marginBottom: "10px", // Add space between images
              }}
            >
              <img
                src={image.imageData}
                alt="Saved Drawing"
                style={{
                  width: "100px",
                  height: "100px",
                  cursor: "pointer",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
                onClick={() => onImageSelect(image.imageData)}
              />
              <p
                style={{
                  fontSize: "12px",
                }}
              >
                {new Date(image.timestamp).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SavedDrawColumn;