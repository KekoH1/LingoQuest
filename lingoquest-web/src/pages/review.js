import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import '../assets/review.css';


const ReviewSection = () => {
    const [reviewName, setReviewName] = useState('');
    const [reviewDescription, setReviewDescription] = useState('');
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reviewSubmitted, setReviewSubmitted] = useState(false);
    const [reviewEmail, setReviewEmail] = useState('');

    


    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch('https://localhost:7196/api/Reviews');
                if (!response.ok) {
                    throw new Error('Failed to fetch reviews');
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

    const handleSubmitReview = async (e) => {
        e.preventDefault();

        const reviewData = {
            name: reviewName,
            description: reviewDescription,
            email: reviewEmail
        };

        try {
            const response = await fetch('https://localhost:7196/api/Reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reviewData)
            });

            if (!response.ok) {
                throw new Error('Failed to submit review');
            }

            setReviewName('');
            setReviewDescription('');
            setReviewEmail('');
            setReviewSubmitted(true); 
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) {
        return <div>Loading reviews...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (

        <div>
            <Navbar />
        <div className="review-section">
            <h2>Submit Your Review</h2>
            <form onSubmit={handleSubmitReview}>
                <div>
                    <label>Your Name:</label>
                    <input
                        type="text"
                        value={reviewName}
                        onChange={(e) => setReviewName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Your Review:</label>
                    <textarea
                        value={reviewDescription}
                        onChange={(e) => setReviewDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={reviewEmail}
                        onChange={(e) => setReviewEmail(e.target.value)}
                        required
                    />
                <button type="submit">Submit Review</button>
            </form>

            {reviewSubmitted && (
                <div>
                    <h3>Thank you for your review!</h3>
                </div>
            )}

            <h2>Previous Reviews</h2>
            {reviews.length === 0 ? (
                <p>No reviews available</p>
            ) : (
                <ul>
                    {reviews.map((review) => (
                        <li key={review.id}>
                            <strong>{review.name}</strong>
                            <p>{review.description}</p>
                            <p>{review.email}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
        </div>
    );
};

export default ReviewSection;
