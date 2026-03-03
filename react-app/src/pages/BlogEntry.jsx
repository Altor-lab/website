import { useParams, Navigate } from 'react-router-dom'
import BlogPost from '../components/BlogPost'
import { blogPosts } from '../content/blog'

const BlogEntry = () => {
  const { slug } = useParams()
  const post = Object.values(blogPosts).find(p => p.slug === `/blog/${slug}`)

  if (!post) return <Navigate to="/blog" replace />

  return <BlogPost post={post} />
}

export default BlogEntry
