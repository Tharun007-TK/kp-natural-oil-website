import os
from PIL import Image

def optimize_images(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.lower().endswith(('.png', '.jpg', '.jpeg')):
                file_path = os.path.join(root, file)
                file_size = os.path.getsize(file_path)
                
                # Convert if size > 200KB (lowered threshold for better optimization)
                if file_size > 200 * 1024: 
                    try:
                        img = Image.open(file_path)
                        
                        # Resize if too large
                        max_width = 1920
                        if img.width > max_width:
                            ratio = max_width / img.width
                            new_height = int(img.height * ratio)
                            img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
                        
                        # Save as WebP
                        new_file_path = os.path.splitext(file_path)[0] + '.webp'
                        img.save(new_file_path, 'WEBP', quality=80)
                        
                        print(f"Converted: {file} -> {os.path.basename(new_file_path)}")
                    except Exception as e:
                        print(f"Failed to convert {file}: {e}")

if __name__ == "__main__":
    optimize_images('./public')
