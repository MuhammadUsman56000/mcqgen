import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  
  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  return 'Just now';
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

export function generateRandomImage(width: number = 1200, height: number = 800): string {
  const imageIds = [
    '1506905925173-5f4f2b5c7af5', // Mountain landscape
    '1519904981063-615d1edb6215', // Ocean view
    '1544735716-392fe2489ffa', // City skyline
    '1502780402661-acc01917cb9c', // Forest path
    '1506905925173-5f4f2b5c7af5', // Desert landscape
    '1540206395-68808572332f', // Northern lights
    '1502736821517-60b74c2b8b2c', // Beach sunset
    '1504870712357-65441b47f2af', // Mountain peak
    '1516733725897-1aa73b87c8d8', // Ancient architecture
    '1504829857797-ddfe374d4edd', // Tropical paradise
  ];
  
  const randomId = imageIds[Math.floor(Math.random() * imageIds.length)];
  return `https://images.unsplash.com/photo-${randomId}?ixlib=rb-4.0.3&auto=format&fit=crop&w=${width}&h=${height}&q=80`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}