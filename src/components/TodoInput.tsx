import { useState } from 'react';

type Props = {
  onAdd: (content: string) => Promise<void>;
};

function TodoInput({ onAdd }: Props) {
  const [content, setContent] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault(); // 기본 동작 페이지 새로고침 방지
    if (!content.trim()) return; // 앞뒤 공백을 제거한 내용이 비어있다면?
    setIsSubmitting(true);
    await onAdd(content.trim());
    setContent('');
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="할 일을 입력하세요"
        disabled={isSubmitting}
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? '추가 중...' : '추가'}
      </button>
    </form>
  );
}

export default TodoInput;