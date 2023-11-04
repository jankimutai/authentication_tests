
from models import Blogs,User
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
        "user_id": 1, 
    }]
def seed_blogs():
    
    for blog_data in sample_blogs:
        blog = Blogs(**blog_data)
        db.session.add(blog)

    db.session.commit()

if __name__ == "__main__":

    with app.app_context():
        Blogs.query.delete()
        seed_blogs()
        User.query.delete()
        db.session.commit()