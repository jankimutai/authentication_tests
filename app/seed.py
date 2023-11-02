
from models import Blogs  # Import your Blogs model
from config import app,db
# Sample data for blog posts
sample_blogs = [
    {
        "title": "Sample Blog 1",
        "content": "This is the content of the first blog post.",
        "user_id": 1,  # Replace with the actual user ID
    },
    {
        "title": "Sample Blog 2",
        "content": "This is the content of the second blog post.",
        "user_id": 1,  # Replace with the actual user ID
    },
    # Add more sample blog posts here
]

# Function to seed the database with sample blog posts
def seed_blogs():
    for blog_data in sample_blogs:
        blog = Blogs(**blog_data)
        db.session.add(blog)

    db.session.commit()

if __name__ == "__main__":
    # Initialize your Flask app and databas

    with app.app_context():
        # Call the seed function to populate the database
        seed_blogs()