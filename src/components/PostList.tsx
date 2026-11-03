import { useEffect, useState } from 'react';

export interface PostCard { category: string; html: string; }
interface Props { posts: PostCard[]; categories: string[]; }

export default function PostList({ posts, categories }: Props) {
  const [category, setCategory] = useState('all');
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const count = category === 'all' ? posts.length : posts.filter(post => post.category === category).length;

  return <>
    <div className="category-filter" data-category-filter="" hidden={!ready}>
      <div className="category-filter-header">
        <h2>카테고리</h2>
        <p className="category-filter-status" data-filter-status="" aria-live="polite">
          {category === 'all' ? `전체 글 ${count}개` : `${category} 글 ${count}개`}
        </p>
      </div>
      <div className="category-filter-options" role="group" aria-label="TIL 카테고리 필터">
        {['all', ...categories].map(value => <button
          key={value} className="category-filter-button" type="button" data-category={value}
          aria-pressed={value === category} onClick={() => setCategory(value)}
        >{value === 'all' ? '전체' : value} <span>{value === 'all' ? posts.length : posts.filter(post => post.category === value).length}</span></button>)}
      </div>
    </div>
    <div className="post-list" aria-label="전체 글 목록">
      {posts.map((post, index) => <article key={index} className="card post-list-card"
        data-post-category={post.category} hidden={category !== 'all' && post.category !== category}
        dangerouslySetInnerHTML={{ __html: post.html }} />)}
    </div>
  </>;
}
