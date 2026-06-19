"use client";

import { useState } from "react";
import { Comment } from "@/types";
import ImageWithFallback from "../ImageWithFallback/ImageWithFallback";
import { getAvatarURL } from "@/config/avatar.config";
import styles from "./Comments.module.css";

interface CommentItemProps {
  comment: Comment;
  currentUserId?: string;
  onUpdate: (id: string, content: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onReply: (parentId: string, content: string) => Promise<void>;
  depth: number;
}

export default function CommentItem({ comment, currentUserId, onUpdate, onDelete, onReply, depth }: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [editValue, setEditValue] = useState(comment.content);
  const [replyValue, setReplyValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isAuthor = currentUserId === comment.userId;
  const authorName = comment.author?.username || "Користувач";

  const handleSaveEdit = async () => {
    if (!editValue.trim() || editValue === comment.content) {
      setIsEditing(false);
      return;
    }
    setIsLoading(true);
    await onUpdate(comment.id, editValue);
    setIsLoading(false);
    setIsEditing(false);
  };

  const handleSendReply = async () => {
    if (!replyValue.trim()) return;
    setIsLoading(true);
    await onReply(comment.id, replyValue);
    setIsLoading(false);
    setIsReplying(false);
    setReplyValue("");
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("uk-UA", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className={styles.commentWrapper}>
      <div className={styles.commentItem}>
        <div className={styles.avatar}>
          {comment.author?.avatarURL ? (
            <img src={getAvatarURL(comment.author.avatarURL)} className={styles.avatar} alt="avatar" />
          ) : (
            <div className={styles.avatarPlaceholder}>{authorName.charAt(0).toUpperCase()}</div>
          )}
        </div>

        <div className={styles.commentContent}>
          <div className={styles.commentHeader}>
            <span className={styles.authorName}>{authorName}</span>
            <span className={styles.commentDate}>{formatDate(comment.createdAt)}</span>
          </div>

          {isEditing ? (
            <div className={styles.editor}>
              <textarea value={editValue} onChange={(e) => setEditValue(e.target.value)} disabled={isLoading} />
              <div className={styles.editorActions}>
                <button onClick={() => setIsEditing(false)} disabled={isLoading}>
                  Скасувати
                </button>
                <button onClick={handleSaveEdit} disabled={isLoading} className={styles.saveBtn}>
                  Зберегти
                </button>
              </div>
            </div>
          ) : (
            <p className={styles.text}>{comment.content}</p>
          )}

          <div className={styles.commentActions}>
            {currentUserId && <button onClick={() => setIsReplying(!isReplying)}>Відповісти</button>}
            {isAuthor && !isEditing && (
              <>
                <button onClick={() => setIsEditing(true)}>Редагувати</button>
                <button onClick={() => onDelete(comment.id)} className={styles.deleteText}>
                  Видалити
                </button>
              </>
            )}
          </div>

          {isReplying && (
            <div className={styles.replyBox}>
              <textarea
                placeholder={`Відповідь для ${authorName}...`}
                value={replyValue}
                onChange={(e) => setReplyValue(e.target.value)}
                disabled={isLoading}
              />
              <div className={styles.editorActions}>
                <button onClick={() => setIsReplying(false)} disabled={isLoading}>
                  Скасувати
                </button>
                <button onClick={handleSendReply} disabled={isLoading} className={styles.saveBtn}>
                  Відправити
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {comment.replies && comment.replies.length > 0 && (
        <div className={depth < 4 ? styles.repliesContainer : styles.repliesContainerFlat}>
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              currentUserId={currentUserId}
              onUpdate={onUpdate}
              onDelete={onDelete}
              onReply={onReply}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
