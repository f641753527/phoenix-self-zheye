import UserProps from '@/beans/User'
import TopicProps from '@/beans/Topic'
import PostProps from '@/beans/Post'

export default interface StoreProps {
  user: UserProps;
  topics: TopicProps[];
  posts: PostProps[];
}
