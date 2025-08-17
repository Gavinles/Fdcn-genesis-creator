
#!/bin/bash

echo "Setting up NLTK VADER Sentiment Analysis..."

# Install Python dependencies
echo "Installing NLTK..."
pip install nltk

# Create Python script for VADER sentiment analysis
cat > sentiment_analyzer.py << 'EOF'
import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer

# Download VADER lexicon if not already present
try:
    nltk.data.find('sentiment/vader_lexicon.zip')
    print("VADER lexicon already downloaded.")
except LookupError:
    print("Downloading VADER lexicon...")
    nltk.download('vader_lexicon')

# Initialize the analyzer
analyzer = SentimentIntensityAnalyzer()

def analyze_sentiment(text):
    """Analyze sentiment of given text using VADER"""
    scores = analyzer.polarity_scores(text)
    return scores

def get_sentiment_label(compound_score):
    """Convert compound score to sentiment label"""
    if compound_score >= 0.05:
        return "Positive"
    elif compound_score <= -0.05:
        return "Negative"
    else:
        return "Neutral"

if __name__ == "__main__":
    # Example usage
    test_texts = [
        "I love this product! It's amazing!",
        "This is terrible and disappointing.",
        "The weather is okay today.",
        "I'm feeling great and excited about the future!"
    ]
    
    print("\n=== VADER Sentiment Analysis Results ===\n")
    
    for text in test_texts:
        scores = analyze_sentiment(text)
        sentiment = get_sentiment_label(scores['compound'])
        
        print(f"Text: {text}")
        print(f"Scores: {scores}")
        print(f"Overall Sentiment: {sentiment}")
        print("-" * 50)
EOF

echo "Running VADER sentiment analysis demo..."
python sentiment_analyzer.py

echo "Setup completed successfully!"
echo "You can now use 'python sentiment_analyzer.py' to run sentiment analysis."
