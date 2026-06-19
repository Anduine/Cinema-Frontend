"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { Comment } from "@/types";
import { getComments, createComment, updateComment, deleteComment, replyToComment } from "@/services/comments.service";
import CommentItem from "./CommentItem";
import styles from "./Comments.module.css";

interface CommentsSectionProps {
  mediaId: string;
}

function CommentsSection({ mediaId }: CommentsSectionProps) {
  const { user } = useAuthStore();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadComments = async (pageNumber: number, append = false) => {
    setIsLoading(true);
    const res = await getComments(mediaId, pageNumber);
    if (res) {
      setComments((prev) => (append ? [...prev, ...res.data] : res.data));
      setTotalPages(res.totalPages);
      setPage(res.page);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadComments(1);
  }, [mediaId]);

  const insertReply = (list: Comment[], parentId: string, newReply: Comment): Comment[] => {
    return list.map((c) => {
      if (c.id === parentId) {
        return { ...c, replies: [...(c.replies || []), newReply] };
      }
      if (c.replies && c.replies.length > 0) {
        return { ...c, replies: insertReply(c.replies, parentId, newReply) };
      }
      return c;
    });
  };

  const updateNode = (list: Comment[], id: string, content: string): Comment[] => {
    return list.map((c) => {
      if (c.id === id) {
        return { ...c, content };
      }
      if (c.replies && c.replies.length > 0) {
        return { ...c, replies: updateNode(c.replies, id, content) };
      }
      return c;
    });
  };

  const deleteNode = (list: Comment[], id: string): Comment[] => {
    return list
      .filter((c) => c.id !== id)
      .map((c) => {
        if (c.replies && c.replies.length > 0) {
          return { ...c, replies: deleteNode(c.replies, id) };
        }
        return c;
      });
  };

  const handleCreate = async () => {
    if (!newComment.trim()) return;
    setIsSubmitting(true);

    const created = await createComment(mediaId, newComment);
    if (created) {
      setComments((prev) => [created.data, ...prev]);
      setNewComment("");
    }

    setIsSubmitting(false);
  };

  const handleUpdate = async (id: string, content: string) => {
    const success = await updateComment(id, content);
    if (success) {
      setComments((prev) => updateNode(prev, id, content));
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Ви впевнені, що хочете видалити коментар?")) return;

    const success = await deleteComment(id);
    if (success) {
      setComments((prev) => deleteNode(prev, id));
    }
  };

  const handleReply = async (parentId: string, content: string) => {
    const created = await replyToComment(parentId, content);
    if (created) {
      setComments((prev) => insertReply(prev, parentId, created.data));
    }
  };

  return (
    <div className={styles.section}>
      <h3 className={styles.title}>Коментарі</h3>

      {user ? (
        <div className={styles.mainForm}>
          <textarea
            placeholder="Поділіться своїми враженнями..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            disabled={isSubmitting}
          />
          <button onClick={handleCreate} disabled={isSubmitting || !newComment.trim()} className={styles.submitBtn}>
            {isSubmitting ? "Публікація..." : "Надіслати"}
          </button>
        </div>
      ) : (
        <div className={styles.loginPrompt}>
          Щоб залишити коментар <a href="/login">увійдіть</a> в акаунт.
        </div>
      )}

      <div className={styles.list}>
        {isLoading && page === 1 ? (
          <div className={styles.loader}>Завантаження...</div>
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              currentUserId={user?.id}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              onReply={handleReply}
              depth={0}
            />
          ))
        ) : (
          <p className={styles.empty}>Коментарів ще немає. Будьте першим!</p>
        )}
      </div>

      {page < totalPages && (
        <button className={styles.loadMoreBtn} onClick={() => loadComments(page + 1, true)} disabled={isLoading}>
          {isLoading ? "Завантаження..." : "Показати ще"}
        </button>
      )}
    </div>
  );
}
export default CommentsSection;
