export {}

// Extend the Window interface to include wavesurfer
export declare global {
    interface Window {
      wavesurfer: any; // Replace `any` with the specific type if available
    }
}

export interface Playlist {
    name: string,
    fileURL: string,
    title: string | null,
    artist: string,
    album: string,
    year: string,
    cover: string | null,
    id?: any,
}