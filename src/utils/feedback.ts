import { formatDistanceToNow } from 'date-fns'
import type { FeedbackWithId } from '@/services/firebase/types'

export const formatTimeAgo = (date: Date): string => {
  try {
    const timeAgo = formatDistanceToNow(date, { addSuffix: true })
    return timeAgo
      .replace('less than a minute ago', '1m ago')
      .replace('about a minute ago', '1m ago')
      .replace('minutes ago', 'm ago')
      .replace('hours ago', 'h ago')
      .replace('days ago', 'd ago')
      .replace('months ago', 'mo ago')
      .replace('years ago', 'y ago')
      .replace('about ', '')
      .replace('over ', '')
      .replace('almost ', '')
      .replace('more than ', '')
  } catch (error) {
    console.error('Error formatting date:', error)
    return 'recently'
  }
}

export const getFeedbackIcon = (type: string): string => {
  switch (type) {
    case 'bug':
      return '🐛'
    case 'feature':
      return '✨'
    default:
      return '💭'
  }
}

export const formatFeedbackType = (type: string): string => {
  switch (type) {
    case 'bug':
      return 'Bug Report'
    case 'feature':
      return 'Feature Request'
    default:
      return 'General Feedback'
  }
}

export const getFeedbackBgColor = (type: string): string => {
  switch (type) {
    case 'bug':
      return 'bg-red-100'
    case 'feature':
      return 'bg-purple-100'
    default:
      return 'bg-blue-100'
  }
}

export const getRecentFeedbacks = (feedbacks: FeedbackWithId[], limit: number = 4) => {
  return feedbacks.slice(0, limit).map((feedback) => ({
    id: feedback.id,
    icon: getFeedbackIcon(feedback.type),
    type: formatFeedbackType(feedback.type),
    description: feedback.text,
    time: formatTimeAgo(feedback.createdAt),
    bgColor: getFeedbackBgColor(feedback.type),
  }))
}

interface FeedbackDistribution {
  name: string
  icon: string
  percentage: number
  color: string
  count: number
}

export const getFeedbackDistribution = (feedbacks: FeedbackWithId[]): FeedbackDistribution[] => {
  const total = feedbacks.length
  if (total === 0) return []

  const typeCounts = feedbacks.reduce(
    (acc, feedback) => {
      acc[feedback.type] = (acc[feedback.type] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const distribution: FeedbackDistribution[] = [
    {
      name: 'Bug Reports',
      icon: '🐛',
      count: typeCounts['bug'] || 0,
      percentage: Math.round(((typeCounts['bug'] || 0) / total) * 100),
      color: 'bg-red-500',
    },
    {
      name: 'Feature Requests',
      icon: '✨',
      count: typeCounts['feature'] || 0,
      percentage: Math.round(((typeCounts['feature'] || 0) / total) * 100),
      color: 'bg-purple-500',
    },
    {
      name: 'General Feedback',
      icon: '💭',
      count: typeCounts['other'] || 0,
      percentage: Math.round(((typeCounts['other'] || 0) / total) * 100),
      color: 'bg-blue-500',
    },
  ]

  return distribution
}

export const getRatingDistribution = (feedbacks: FeedbackWithId[]): FeedbackDistribution[] => {
  const total = feedbacks.length
  if (total === 0) return []

  const ratingCounts = feedbacks.reduce(
    (acc, feedback) => {
      acc[feedback.rating] = (acc[feedback.rating] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const ratingConfig = {
    amazing: { name: 'Amazing', icon: '😄', color: 'bg-green-500' },
    good: { name: 'Good', icon: '🙂', color: 'bg-blue-500' },
    okay: { name: 'Okay', icon: '😐', color: 'bg-yellow-500' },
    bad: { name: 'Bad', icon: '😕', color: 'bg-orange-500' },
    terrible: { name: 'Terrible', icon: '😫', color: 'bg-red-500' },
  }

  return Object.entries(ratingConfig).map(([rating, config]) => ({
    name: config.name,
    icon: config.icon,
    count: ratingCounts[rating] || 0,
    percentage: Math.round(((ratingCounts[rating] || 0) / total) * 100),
    color: config.color,
  }))
}

export const getFeedbackById = (feedbacks: FeedbackWithId[], id: string) => {
  return feedbacks.find((fb) => fb.id === id)
}
