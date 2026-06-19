"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Stream, Translation } from "@/types";
import { deleteStream } from "@/services/streams.service";
import EditButton from "@/components/ui/ButtonEdit/EditButton";
import ModalWindow from "@/components/ui/ModalWindow/ModalWindow";
import VideoUploadForm from "../../Forms/VideoUploadForm/VideoUploadForm";
import DeleteButton from "@/components/ui/ButtonDelete/DeleteButton";
import stylesTable from "../Table.module.css";
import styles from "./StreamsList.module.css";

interface Props {
  streams: Stream[];
  availableTranslations: Translation[];
  mediaId: string;
  seasonNumber: number;
  seasonId: string;
  episodeNumber: number;
  episodeId: string;
}

function StreamsList({ streams, mediaId, seasonNumber, seasonId, episodeNumber, episodeId, availableTranslations }: Props) {
  const router = useRouter();
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<Stream | null>(null);

  const handleEditStream = (stream: Stream) => {
    setIsEditModalOpen(stream);
  };

  const handleDeleteStream = async (streamId: string) => {
    if (!window.confirm(`Ви впевнені, що хочете видалити відео потік?`)) {
      return;
    }

    const ok = await deleteStream(streamId);
    if (ok) {
      router.refresh();
    }
  };

  return (
    <>
      <table className={stylesTable.table}>
        <thead>
          <tr className={stylesTable.nonActiveRow}>
            <th>ID</th>
            <th>Назва студії</th>
            <th>Статус</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          <tr className={stylesTable.nonActiveRow}>
            <td colSpan={4}>
              <div className={stylesTable.actionsBarRow}>
                <button className={styles.btn} onClick={() => setIsUploadModalOpen(true)}>
                  + Завантажити відео
                </button>
              </div>
            </td>
          </tr>
          {streams.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.translationName}</td>
              <td>{s.status}</td>
              <td className={stylesTable.actions}>
                <EditButton onClick={() => handleEditStream(s)} />
                <DeleteButton onClick={() => handleDeleteStream(s.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isUploadModalOpen && (
        <ModalWindow headerText="Завантажити відео" onClose={() => setIsUploadModalOpen(false)}>
          <VideoUploadForm
            mediaId={mediaId}
            seasonNumber={seasonNumber}
            seasonId={seasonId}
            episodeNumber={episodeNumber}
            episodeId={episodeId}
            availableTranslations={availableTranslations}
            onClose={() => setIsUploadModalOpen(false)}
          />
        </ModalWindow>
      )}

      {/* {isEditModalOpen && (
        <ModalWindow headerText="Редагування відео" onClose={() => setIsEditModalOpen(null)}>
          <VideoUploadForm
            mediaId={mediaId}
            seasonNumber={seasonNumber}
            seasonId={seasonId}
            episodeNumber={episodeNumber}
            episodeId={episodeId}
            availableTranslations={availableTranslations}
            stream={isEditModalOpen}
            onClose={() => setIsEditModalOpen(null)}
          />
        </ModalWindow>
      )} */}
    </>
  );
}
export default StreamsList;
