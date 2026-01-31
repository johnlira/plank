"use client";

import { useState, useRef } from "react";
import { ImagePlus, X } from "lucide-react";
import { usePlantStore } from "@/stores/usePlantStore";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const ACCEPT = "image/jpeg,image/png,image/webp";
const MAX_SIZE_MB = 10;

interface AddPlantDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function AddPlantDialog({ open, onOpenChange }: AddPlantDialogProps) {
  const [nickname, setNickname] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { createPlant, isLoading } = usePlantStore();

  const acceptTypes = new Set(ACCEPT.split(","));

  const setFileIfValid = (file: File | null) => {
    if (!file) {
      setImageFile(null);
      return;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) return;
    if (!acceptTypes.has(file.type)) return;
    setImageFile(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileIfValid(e.target.files?.[0] ?? null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (isLoading) return;
    const file = e.dataTransfer.files?.[0] ?? null;
    setFileIfValid(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  const handleRemoveFile = () => {
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = nickname.trim();
    if (!trimmed) return;
    if (!imageFile) return;

    const plant = await createPlant(trimmed, imageFile);
    if (plant) {
      setNickname("");
      handleRemoveFile();
      onOpenChange(false);
    }
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      setNickname("");
      handleRemoveFile();
    }
    onOpenChange(next);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add plant</DialogTitle>
          <DialogDescription>
            Give your plant a name and upload a photo for identification.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="plant-nickname">Plant name</Label>
            <Input
              id="plant-nickname"
              placeholder="e.g. My succulent"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              minLength={2}
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="plant-image">Plant image</Label>
            <input
              ref={fileInputRef}
              id="plant-image"
              type="file"
              accept={ACCEPT}
              onChange={handleFileChange}
              className="sr-only"
              aria-describedby="image-hint"
              disabled={isLoading}
            />
            {!imageFile ? (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                disabled={isLoading}
                className={cn(
                  "flex w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-input bg-muted/30 px-4 py-8 transition-colors",
                  "hover:border-primary/50 hover:bg-muted/50 disabled:pointer-events-none disabled:opacity-50",
                  "min-h-[120px] aspect-[2/1] max-h-[160px]"
                )}
              >
                <ImagePlus className="size-10 text-muted-foreground" />
                <span className="text-center text-sm font-medium text-foreground">
                  Drag an image here or click to select
                </span>
                <span id="image-hint" className="text-center text-xs text-muted-foreground">
                  One file at a time. JPEG, PNG or WebP, up to {MAX_SIZE_MB} MB.
                </span>
              </button>
            ) : (
              <div
                className={cn(
                  "flex items-center gap-3 rounded-lg border border-input bg-muted/30 px-4 py-3",
                  "min-h-[72px] w-full"
                )}
              >
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="truncate text-sm font-medium text-foreground">
                    {imageFile.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatFileSize(imageFile.size)}
                  </span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={handleRemoveFile}
                  disabled={isLoading}
                  aria-label="Remove image"
                >
                  <X className="size-4" />
                </Button>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || !nickname.trim() || !imageFile}>
              {isLoading ? "Uploading…" : "Add"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
