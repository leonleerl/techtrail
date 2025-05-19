import { PrismaClient } from '../generated/prisma'

const prisma = new PrismaClient()

async function main() {
  // Clean existing data
  await prisma.post.deleteMany({})
  await prisma.category.deleteMany({})

  console.log('Deleted existing posts and categories')
  
  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Technology',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Web Development',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Data Science',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Programming',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Mobile Development',
      },
    }),
  ])

  console.log('Created categories:', categories)

  // Create posts
  const posts = await Promise.all([
    // Technology posts
    prisma.post.create({
      data: {
        title: 'The Future of Artificial Intelligence',
        slug: 'future-of-ai',
        content: 'Artificial Intelligence is rapidly evolving. In this post, we explore the latest trends and what the future holds for AI technologies across various industries.',
        published: true,
        views: 1240,
        categoryId: categories[0].id,
      },
    }),
    prisma.post.create({
      data: {
        title: 'Understanding Quantum Computing',
        slug: 'quantum-computing-explained',
        content: 'Quantum computing represents a paradigm shift in computational power. This post breaks down the complex concepts behind quantum mechanics and how they apply to computing.',
        published: true,
        views: 895,
        categoryId: categories[0].id,
      },
    }),
    
    // Web Development posts
    prisma.post.create({
      data: {
        title: 'React vs Angular: Which Framework to Choose in 2023',
        slug: 'react-vs-angular-2023',
        content: 'Both React and Angular continue to dominate the frontend development space. This comparison looks at performance, ecosystem, learning curve, and job market demand.',
        published: true,
        views: 2380,
        categoryId: categories[1].id,
      },
    }),
    prisma.post.create({
      data: {
        title: 'Building Scalable APIs with Node.js',
        slug: 'scalable-nodejs-apis',
        content: 'Learn best practices for creating maintainable and high-performance APIs using Node.js, Express, and modern architectural patterns.',
        published: true,
        views: 1678,
        categoryId: categories[1].id,
      },
    }),
    
    // Data Science posts
    prisma.post.create({
      data: {
        title: 'Introduction to Natural Language Processing',
        slug: 'intro-to-nlp',
        content: 'Natural Language Processing is transforming how computers understand human language. This guide introduces key concepts and practical applications of NLP.',
        published: true,
        views: 1125,
        categoryId: categories[2].id,
      },
    }),
    prisma.post.create({
      data: {
        title: 'Machine Learning for Beginners',
        slug: 'ml-for-beginners',
        content: 'Starting your journey with machine learning? This comprehensive guide covers fundamental algorithms and provides hands-on examples to get you started.',
        published: false,
        views: 0,
        categoryId: categories[2].id,
      },
    }),
    
    // Programming posts
    prisma.post.create({
      data: {
        title: 'Mastering TypeScript: Advanced Techniques',
        slug: 'advanced-typescript',
        content: 'Take your TypeScript skills to the next level with advanced type manipulation, decorators, and architectural patterns for large-scale applications.',
        published: true,
        views: 1820,
        categoryId: categories[3].id,
      },
    }),
    prisma.post.create({
      data: {
        title: 'Clean Code Principles Every Developer Should Know',
        slug: 'clean-code-principles',
        content: 'Writing clean, maintainable code is an essential skill. Learn the timeless principles that will make your codebase more readable and easier to maintain.',
        published: true,
        views: 3150,
        categoryId: categories[3].id,
      },
    }),
    
    // Mobile Development posts
    prisma.post.create({
      data: {
        title: 'Flutter vs React Native: Cross-platform Development Comparison',
        slug: 'flutter-vs-react-native',
        content: 'Both Flutter and React Native offer compelling solutions for cross-platform mobile development. This in-depth analysis helps you decide which is best for your next project.',
        published: true,
        views: 1547,
        categoryId: categories[4].id,
      },
    }),
    prisma.post.create({
      data: {
        title: 'Building Your First iOS App with Swift',
        slug: 'first-ios-app-swift',
        content: 'Follow this step-by-step tutorial to create your first iOS application using Swift and SwiftUI, covering essential concepts and best practices.',
        published: true,
        views: 982,
        categoryId: categories[4].id,
      },
    }),
  ])

  console.log(`Created ${posts.length} posts`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 