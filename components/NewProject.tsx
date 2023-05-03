'use client';

import { createNewProject } from '@/lib/api';
import { useState, FormEvent, useTransition } from 'react';
import { useRouter } from 'next/navigation';

import Modal from 'react-modal';
import Button from './Button';
import Input from './Input';
import Loader from './Loader';

Modal.setAppElement('#modal');

const NewProject = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  const [name, setName] = useState('');

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);

  const isMutating = isFetching || isPending;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setIsFetching(true);
    closeModal();
    await createNewProject(name);
    setIsFetching(false);

    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <div className="px-6 py-8 hover:scale-105 transition-all ease-in-out duration-200 flex justify-center items-center">
      {isMutating ? (
        <Loader />
      ) : (
        <Button onClick={() => openModal()}>+ New Project</Button>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="w-2/4 bg-white rounded-xl p-8"
        overlayClassName="bg-[rgba(0,0,0,.4)] flex justify-center items-center absolute top-0 left-0 h-screen w-screen"
      >
        <h1 className="text-3xl mb-6">Create new project</h1>

        <form onSubmit={handleSubmit}>
          <Input
            value={name}
            placeholder="Project name"
            onChange={e => setName(e.target.value)}
          />

          <div className="mt-4">
            <Button type="submit">Create</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default NewProject;
