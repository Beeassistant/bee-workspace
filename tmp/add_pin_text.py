#!/usr/bin/env python3
from PIL import Image, ImageDraw, ImageFont
import textwrap
import os

# Try to find a good font, fallback to default
def get_font(size):
    font_paths = [
        "/System/Library/Fonts/Helvetica.ttc",
        "/System/Library/Fonts/HelveticaNeue.ttc", 
        "/Library/Fonts/Arial.ttf",
        "/System/Library/Fonts/Arial.ttf",
    ]
    for path in font_paths:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except:
                continue
    return ImageFont.load_default()

def add_text_overlay(input_path, output_path, headline, subheadline=None, tagline=None):
    """Add text overlay to a Pinterest pin image"""
    img = Image.open(input_path)
    width, height = img.size
    
    # Pinterest recommended: 1000x1500 (2:3 aspect ratio)
    # If image is different size, we might need to handle that
    
    draw = ImageDraw.Draw(img)
    
    # Colors
    white = (255, 255, 255)
    red = (230, 0, 35)  # Pinterest red
    dark = (20, 20, 20)
    
    # Headline - large, bold, centered
    font_size_hl = int(height * 0.045)  # Responsive font size
    font_hl = get_font(font_size_hl)
    
    # Calculate position for headline (upper third)
    x_center = width // 2
    y_headline = int(height * 0.12)
    
    # Wrap headline text
    max_chars = int(width / (font_size_hl * 0.6))
    lines = textwrap.wrap(headline, width=max_chars)
    
    y_text = y_headline
    for line in lines:
        bbox = draw.textbbox((0, 0), line, font=font_hl)
        text_width = bbox[2] - bbox[0]
        x = (width - text_width) // 2
        # Draw shadow for readability
        draw.text((x + 2, y_text + 2), line, font=font_hl, fill=dark)
        draw.text((x, y_text), line, font=font_hl, fill=white)
        y_text += font_hl.getbbox(line)[3] - font_hl.getbbox(line)[1] + 8
    
    # Subheadline (middle third)
    if subheadline:
        font_size_sh = int(height * 0.03)
        font_sh = get_font(font_size_sh)
        
        y_sub = int(height * 0.42)
        sub_lines = textwrap.wrap(subheadline, width=max_chars + 10)
        
        for line in sub_lines:
            bbox = draw.textbbox((0, 0), line, font=font_sh)
            text_width = bbox[2] - bbox[0]
            x = (width - text_width) // 2
            draw.text((x + 1, y_sub + 1), line, font=font_sh, fill=dark)
            draw.text((x, y_sub), line, font=font_sh, fill=red)
            y_sub += font_sh.getbbox(line)[3] - font_sh.getbbox(line)[1] + 6
    
    # Tagline at bottom
    if tagline:
        font_size_tl = int(height * 0.025)
        font_tl = get_font(font_size_tl)
        
        y_tag = int(height * 0.88)
        bbox = draw.textbbox((0, 0), tagline, font=font_tl)
        text_width = bbox[2] - bbox[0]
        x = (width - text_width) // 2
        draw.text((x + 1, y_tag + 1), tagline, font=font_tl, fill=(50, 50, 50))
        draw.text((x, y_tag), tagline, font=font_tl, fill=white)
    
    img.save(output_path)
    print(f"Saved: {output_path}")

# Generate pins with text overlays
base_path = "/Users/beeassistant/.openclaw/workspace/tmp"

# Pin 1: Problem/Solution
add_text_overlay(
    f"{base_path}/pin-01-problem-solution.png",
    f"{base_path}/pin-01-final.png",
    "Setting Up OpenClaw Is Harder",
    "Than It Should Be.",
    "Done-For-You OpenClaw Setup • buzzassist.gumroad.com/l/yhwtyq"
)

# Pin 2: Stats
add_text_overlay(
    f"{base_path}/pin-02-stats.png", 
    f"{base_path}/pin-02-final.png",
    "Done-For-You OpenClaw Setup",
    "Everything You Need. Nothing You Don't.",
    "70+ Skills | 24/7 Autonomous | Ready in Minutes"
)

# Pin 3: Testimonial
add_text_overlay(
    f"{base_path}/pin-03-testimonial.png",
    f"{base_path}/pin-03-final.png",
    "I Kept Breaking My OpenClaw Setup.",
    "Then I Found This.",
    "Done-For-You OpenClaw Setup • FIRST10 for 50% Off"
)

# Pin 4: Is This You?
add_text_overlay(
    f"{base_path}/pin-04-is-this-you.png",
    f"{base_path}/pin-04-final.png",
    "Want an OpenClaw AI That",
    "Works Like a CEO?",
    "Done-For-You OpenClaw Setup • From $97"
)

print("\nAll pins created!")
