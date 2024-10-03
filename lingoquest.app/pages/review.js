import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import Navbar from "../components/navbar";

const ReviewSection = () => {
  const [reviewName, setReviewName] = useState("");
  const [reviewDescription, setReviewDescription] = useState("");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [reviewEmail, setReviewEmail] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("https://localhost:7196/api/Reviews");
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [reviewSubmitted]);

  const handleSubmitReview = async () => {
    const reviewData = {
      name: reviewName,
      description: reviewDescription,
      email: reviewEmail,
    };

    try {
      const response = await fetch("https://localhost:7196/api/Reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit review");
      }

      setReviewName("");
      setReviewDescription("");
      setReviewEmail("");
      setReviewSubmitted(true);
      Alert.alert("Success", "Thank you for your review!");
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <Text>Loading reviews...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Navbar />
      <View style={styles.reviewSection}>
        <Text style={styles.heading}>Submit Your Review</Text>
        <View style={styles.formElement}>
          <Text>Your Name:</Text>
          <TextInput
            style={styles.input}
            value={reviewName}
            onChangeText={setReviewName}
            required
          />
        </View>
        <View style={styles.formElement}>
          <Text>Email:</Text>
          <TextInput
            style={styles.input}
            value={reviewEmail}
            onChangeText={setReviewEmail}
            keyboardType="email-address"
            required
          />
        </View>
        <View style={styles.formElement}>
          <Text>Your Review:</Text>
          <TextInput
            style={styles.textArea}
            value={reviewDescription}
            onChangeText={setReviewDescription}
            multiline
            numberOfLines={4}
            required
          />
        </View>
        <Button title="Submit Review" onPress={handleSubmitReview} />
        {reviewSubmitted && (
          <Text style={styles.thankYou}>Thank you for your review!</Text>
        )}
      </View>

      <View style={styles.previousReview}>
        <Text style={styles.heading}>Previous Reviews</Text>
        {reviews.length === 0 ? (
          <Text>No reviews available</Text>
        ) : (
          reviews.map((review) => (
            <View key={review.id} style={styles.reviewItem}>
              <Text style={styles.reviewName}>
                <strong>{review.name}</strong>
              </Text>
              <Text>{review.description}</Text>
              <Text>{review.email}</Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};
// CSS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  reviewSection: {
    marginBottom: 20,
  },
  previousReview: {
    marginTop: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  formElement: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    minHeight: 80,
  },
  thankYou: {
    marginTop: 10,
    color: "green",
    fontWeight: "bold",
  },
  reviewItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
  },
  reviewName: {
    fontWeight: "bold",
  },
});

export default ReviewSection;
