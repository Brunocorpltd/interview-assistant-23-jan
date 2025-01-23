import React from 'react';
import { Folder } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { folders } from '../../data/documentFolders';
import { FolderCard } from './shared/FolderCard';
import { CreateNewFolder } from './shared/CreateNewFolder';

export default function DocumentGrid() {
  const navigate = useNavigate();

  const handleFolderClick = (path: string) => {
    navigate(`/documents/${path}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {folders.map((folder) => (
        <FolderCard
          key={folder.id}
          name={folder.name}
          icon={<Folder className="w-12 h-12 text-[#F5B544]" />}
          onClick={() => handleFolderClick(folder.path)}
        />
      ))}
      <CreateNewFolder />
    </div>
  );
}