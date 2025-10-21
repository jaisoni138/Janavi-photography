import React, { useState } from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Carousel } from 'primereact/carousel';
import { Card } from 'primereact/card';
import { InputTextarea } from 'primereact/inputtextarea';
import { Textarea } from 'primereact/textarea'

const samplePhotos = [
  { id: 1, src: '/photos/photo1.jpg', title: 'Coastline at Dawn' },
  { id: 2, src: '/photos/photo2.jpg', title: 'Forest Mist' },
  { id: 3, src: '/photos/photo3.jpg', title: 'City Lights' },
  { id: 4, src: '/photos/photo4.jpg', title: 'Desert Texture' },
  { id: 5, src: '/photos/photo5.jpg', title: 'Mountain Peak' },
];

export default function PhotographyHome() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePhoto, setActivePhoto] = useState(samplePhotos[0]);
  const [contactVisible, setContactVisible] = useState(false);

  const menuModel = [
    { label: 'Portfolio', command: () => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' }) },
    { label: 'About', command: () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }) },
    { label: 'Contact', command: () => setContactVisible(true) },
  ];

  const responsiveOptions = [
    { breakpoint: '1024px', numVisible: 3, numScroll: 3 },
    { breakpoint: '768px', numVisible: 2, numScroll: 2 },
    { breakpoint: '560px', numVisible: 1, numScroll: 1 }
  ];

  const photoTemplate = (photo) => (
    <div className="p-2 cursor-pointer" onClick={() => { setActivePhoto(photo); setLightboxOpen(true); }}>
      <Card className="shadow-lg" title={photo.title} style={{ padding: 0 }}>
        <img src={photo.src} alt={photo.title} className="w-full h-60 object-cover rounded-t-lg" />
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 antialiased">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="logo" className="w-10 h-10 rounded-lg"/>
            <div>
              <h1 className="text-xl font-semibold">Your Name Photography</h1>
              <p className="text-xs text-gray-500">Visual storytelling & editorial work</p>
            </div>
          </div>
          <Menubar model={menuModel} className="bg-transparent border-none p-0"/>
        </div>
      </header>
      <main>
        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">Capturing moments that tell a story</h2>
              <p className="mt-4 text-lg text-gray-600">Contemporary portraiture, travel and landscape photography.</p>
              <div className="mt-6 flex gap-3">
                <Button label="View Portfolio" icon="pi pi-images" onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })} />
                <Button label="Book a Session" className="p-button-secondary" icon="pi pi-calendar" onClick={() => setContactVisible(true)} />
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img src="/photos/hero.jpg" alt="hero" className="w-full h-96 object-cover" />
            </div>
          </div>
        </section>
        <section id="portfolio" className="bg-white py-12">
          <div className="max-w-6xl mx-auto px-4">
            <h3 className="text-2xl font-semibold mb-6">Featured Work</h3>
            <Carousel value={samplePhotos} numVisible={3} numScroll={1} responsiveOptions={responsiveOptions} itemTemplate={photoTemplate} className="mb-8" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {samplePhotos.map(photo => (
                <div key={photo.id} className="group rounded overflow-hidden shadow hover:shadow-lg transition-shadow duration-200">
                  <img src={photo.src} alt={photo.title} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" onClick={() => { setActivePhoto(photo); setLightboxOpen(true); }} />
                  <div className="p-4">
                    <h4 className="font-medium">{photo.title}</h4>
                    <p className="text-sm text-gray-500 mt-1">Editorial / Personal Project</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-white border-t mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-600">© {new Date().getFullYear()} Your Name — All rights reserved</div>
          <div className="flex gap-3">
            <a href="#" aria-label="instagram" className="pi pi-instagram text-xl"></a>
            <a href="#" aria-label="email" className="pi pi-envelope text-xl"></a>
          </div>
        </div>
      </footer>
      <Dialog header={activePhoto.title} visible={lightboxOpen} style={{ width: '80vw', maxWidth: '900px' }} onHide={() => setLightboxOpen(false)}>
        <div className="flex justify-center">
          <img src={activePhoto.src} alt={activePhoto.title} className="w-full h-auto object-contain" />
        </div>
      </Dialog>
      <Dialog header="Get in touch" visible={contactVisible} style={{ width: '40vw', minWidth: '320px' }} onHide={() => setContactVisible(false)}>
        <form className="grid gap-3">
          <InputText placeholder="Name" />
          <InputText placeholder="Email" />
          <InputText placeholder="Subject" />
          <Textarea rows={4} placeholder="Message" />
          <div className="flex justify-end">
            <Button label="Send" icon="pi pi-paper-plane" />
          </div>
        </form>
      </Dialog>
    </div>
  );
}
