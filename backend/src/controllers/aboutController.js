import { pool, memoryStore, saveMemoryStoreToDisk } from '../config/db.js';

// Ensure memoryStore has initial default values for all About page tables
function initAboutStore() {
  if (!memoryStore.about_profile) {
    memoryStore.about_profile = {
      id: 1,
      fullName: 'Alazar Asdesach',
      professionalTitle: 'Video Director & Senior Graphic Designer',
      headline: 'Director & Visual Artist.',
      shortDescription: 'With over 8 years of experience in video production, cinematic color science, and senior-level brand design — crafting visual assets that communicate identity with precision.',
      fullDescription: 'Passionate about rhythmic video editing, high-dynamic-range color science on RED 8K & Sony cinema cameras, and timeless brand identity systems.',
      profileImage: '/assets/images/alazar.png',
      profileImageAlt: 'Alazar Asdesach - Video Director & Visual Artist',
      secondaryImage: '/assets/images/alazar.png',
      secondaryImageAlt: 'Alazar Asdesach Portrait',
      heroBackgroundImage: '',
      heroBackgroundVideo: '',
      heroBackgroundType: 'IMAGE',
      availabilityStatus: 'Accepting Q3 / Q4 Projects — Global & Remote',
      location: 'Addis Ababa, Ethiopia / Remote Worldwide',
      email: 'svga.asdesach1@gmail.com',
      phone: '+251 900 000000',
      yearsExperience: '8+'
    };
  }

  if (!memoryStore.profile_media) {
    memoryStore.profile_media = [
      { id: 1, profileId: 1, mediaType: 'PROFILE_IMAGE', image: '/assets/images/alazar.png', altText: 'Alazar Front Main', caption: 'Lead Creative', displayOrder: 0, isVisible: true },
      { id: 2, profileId: 1, mediaType: 'PORTRAIT', image: '/assets/images/alazar.png', altText: 'Alazar Back Left', caption: 'Cinematic Colorist', displayOrder: 1, isVisible: true },
      { id: 3, profileId: 1, mediaType: 'STUDIO', image: '/assets/images/alazar.png', altText: 'Alazar Back Right', caption: 'On Set Director', displayOrder: 2, isVisible: true }
    ];
  }

  if (!memoryStore.creative_capabilities) {
    memoryStore.creative_capabilities = [
      { id: 1, title: 'Paced Editing', description: 'Cutting footage to match musical cadence, emotional beat, and narrative flow.', iconName: 'Film', customIcon: '', image: '', isVisible: true, displayOrder: 0 },
      { id: 2, title: 'Color Science', description: 'Transforming flat camera log profiles into rich, cinematic color gamuts.', iconName: 'Layers', customIcon: '', image: '', isVisible: true, displayOrder: 1 },
      { id: 3, title: 'Camera & Lens', description: 'Capturing ultra-sharp 8K raw frames with prime lenses and controlled lighting.', iconName: 'Camera', customIcon: '', image: '', isVisible: true, displayOrder: 2 },
      { id: 4, title: 'Brand Identity', description: 'Building cohesive poster art, motion graphics, and graphic design system.', iconName: 'Shapes', customIcon: '', image: '', isVisible: true, displayOrder: 3 }
    ];
  }

  if (!memoryStore.creative_disciplines) {
    memoryStore.creative_disciplines = [
      {
        id: 1,
        title: 'Video Production',
        badge: 'Video Production',
        experienceLabel: '8+ Yrs Experience',
        headline: 'Senior Video Editor & Colorist',
        description: 'Mastery in cinematic editing, rhythm-perfect cuts, high-dynamic-range color grading from RAW log to broadcast master, and professional sound design — on RED 8K and Sony cinema cameras.',
        primaryIcon: 'Film',
        coverImage: '',
        awardText: 'Telly Gold • Vimeo Staff Pick',
        awardIcon: 'Award',
        buttonText: 'View Edits',
        buttonLink: '/portfolio',
        isVisible: true,
        displayOrder: 0
      },
      {
        id: 2,
        title: 'Graphic Design',
        badge: 'Graphic Design',
        experienceLabel: 'Senior Level',
        headline: 'Senior Graphics Designer & Director',
        description: 'Comprehensive brand identity systems, editorial poster design, 3D visual concepts, motion graphics, and digital UI kits — built to last and scale across every brand touchpoint.',
        primaryIcon: 'Shapes',
        coverImage: '',
        awardText: 'Awwwards Site of the Day',
        awardIcon: 'Star',
        buttonText: 'View Designs',
        buttonLink: '/portfolio',
        isVisible: true,
        displayOrder: 1
      }
    ];
  }

  if (!memoryStore.discipline_expertise) {
    memoryStore.discipline_expertise = [
      { id: 1, disciplineId: 1, title: 'Color Grading', subtitle: 'DaVinci Resolve Studio', description: 'Advanced node-based LUT creation and HDR grading', icon: 'Sliders', software: 'DaVinci Resolve Studio', isVisible: true, displayOrder: 0 },
      { id: 2, disciplineId: 1, title: 'Commercial Edit', subtitle: 'Premiere Pro / Resolve', description: 'Rhythmic editing and multi-cam sync', icon: 'Film', software: 'Adobe Premiere Pro', isVisible: true, displayOrder: 1 },
      { id: 3, disciplineId: 1, title: 'Sound Design', subtitle: 'Fairlight & Pro Tools', description: 'Foley, ambient mixing, audio restoration', icon: 'Monitor', software: 'Fairlight & Pro Tools', isVisible: true, displayOrder: 2 },
      { id: 4, disciplineId: 1, title: '8K Cinema RAW', subtitle: 'RED V-Raptor / FX6', description: 'High resolution digital cinematography workflow', icon: 'Camera', software: 'RED / Sony', isVisible: true, displayOrder: 3 },
      { id: 5, disciplineId: 2, title: 'Brand Identity', subtitle: 'Illustrator / Figma', description: 'Logo systems, typography rules, brand guidelines', icon: 'Shapes', software: 'Adobe Illustrator', isVisible: true, displayOrder: 0 },
      { id: 6, disciplineId: 2, title: 'Motion Graphics', subtitle: 'After Effects / C4D', description: 'Keyframe animation, 2D/3D visual effects', icon: 'Layers', software: 'Adobe After Effects', isVisible: true, displayOrder: 1 },
      { id: 7, disciplineId: 2, title: 'Print & Editorial', subtitle: 'InDesign / Photoshop', description: 'High-res poster art and print masters', icon: 'Layers', software: 'Adobe InDesign', isVisible: true, displayOrder: 2 },
      { id: 8, disciplineId: 2, title: '3D Art Direction', subtitle: 'Blender / Octane', description: 'Product renders and 3D concept graphics', icon: 'Camera', software: 'Blender 3D', isVisible: true, displayOrder: 3 }
    ];
  }

  if (!memoryStore.discipline_tags) {
    memoryStore.discipline_tags = [
      { id: 1, disciplineId: 1, name: 'Music Video Cuts', displayOrder: 0, isVisible: true },
      { id: 2, disciplineId: 1, name: 'Documentary', displayOrder: 1, isVisible: true },
      { id: 3, disciplineId: 1, name: 'Brand Reel', displayOrder: 2, isVisible: true },
      { id: 4, disciplineId: 1, name: '3D Motion', displayOrder: 3, isVisible: true },
      { id: 5, disciplineId: 1, name: 'Social Reels', displayOrder: 4, isVisible: true },
      { id: 6, disciplineId: 1, name: 'Film Grading', displayOrder: 5, isVisible: true },
      { id: 7, disciplineId: 2, name: 'Logo Systems', displayOrder: 0, isVisible: true },
      { id: 8, disciplineId: 2, name: 'Brand Guide', displayOrder: 1, isVisible: true },
      { id: 9, disciplineId: 2, name: 'Poster Art', displayOrder: 2, isVisible: true },
      { id: 10, disciplineId: 2, name: 'UI Systems', displayOrder: 3, isVisible: true },
      { id: 11, disciplineId: 2, name: 'Packaging', displayOrder: 4, isVisible: true }
    ];
  }

  if (!memoryStore.about_statistics) {
    memoryStore.about_statistics = [
      { id: 1, value: '140', suffix: '+', label: 'Projects Delivered', description: 'Completed commercial, music video, and brand design projects', icon: 'Film', isVisible: true, displayOrder: 0 },
      { id: 2, value: '8', suffix: '+', label: 'Years of Mastery', description: 'Dedicated creative experience across video and design', icon: 'Award', isVisible: true, displayOrder: 1 },
      { id: 3, value: '98', suffix: '%', label: 'Client Satisfaction', description: 'Consistently praised for quality, communication, and deadlines', icon: 'Star', isVisible: true, displayOrder: 2 },
      { id: 4, value: '12', suffix: '', label: 'Industry Awards Won', description: 'Recognized by Vimeo, Telly Awards, and Cannes Lions shortlist', icon: 'Award', isVisible: true, displayOrder: 3 }
    ];
  }

  if (!memoryStore.skill_categories) {
    memoryStore.skill_categories = [
      { id: 1, name: 'Video & Post-Production', slug: 'video', icon: 'Film', description: 'Editing, color science, sound design', isVisible: true, displayOrder: 0 },
      { id: 2, name: 'Graphic & Motion Design', slug: 'design', icon: 'Shapes', description: 'Branding, illustration, typography, 3D motion', isVisible: true, displayOrder: 1 },
      { id: 3, name: 'Filming & Field Operation', slug: 'filming', icon: 'Camera', description: 'Camera operation, lighting, audio capture', isVisible: true, displayOrder: 2 }
    ];
  }

  if (!memoryStore.professional_skills) {
    memoryStore.professional_skills = [
      { id: 1, categoryId: 1, name: 'DaVinci Resolve Studio', description: 'Color grading, Fairlight audio & node-based editing', percentage: 98, experienceLevel: 'EXPERT', icon: 'Film', customIcon: '', logo: '', softwareWebsite: 'https://www.blackmagicdesign.com/products/davinciresolve', yearsExperience: '8 Yrs', isFeatured: true, isVisible: true, displayOrder: 0 },
      { id: 2, categoryId: 1, name: 'Adobe Premiere Pro', description: 'Rhythmic cutting, multicam & speed ramping', percentage: 95, experienceLevel: 'EXPERT', icon: 'Film', customIcon: '', logo: '', softwareWebsite: 'https://www.adobe.com/products/premiere.html', yearsExperience: '8 Yrs', isFeatured: true, isVisible: true, displayOrder: 1 },
      { id: 3, categoryId: 1, name: 'Frame.io Collaboration', description: 'Seamless cloud review and client feedback rounds', percentage: 90, experienceLevel: 'ADVANCED', icon: 'MessageSquare', customIcon: '', logo: '', softwareWebsite: 'https://frame.io', yearsExperience: '5 Yrs', isFeatured: false, isVisible: true, displayOrder: 2 },
      { id: 4, categoryId: 1, name: 'Sound Design & Foley', description: 'Environmental ambience, vocal polishing, & sound FX', percentage: 88, experienceLevel: 'ADVANCED', icon: 'Monitor', customIcon: '', logo: '', softwareWebsite: '', yearsExperience: '6 Yrs', isFeatured: false, isVisible: true, displayOrder: 3 },
      { id: 5, categoryId: 2, name: 'Photoshop', description: 'Key visual creation, poster composition & retouching', percentage: 95, experienceLevel: 'EXPERT', icon: 'Layers', customIcon: '', logo: '', softwareWebsite: 'https://www.adobe.com/products/photoshop.html', yearsExperience: '8 Yrs', isFeatured: true, isVisible: true, displayOrder: 0 },
      { id: 6, categoryId: 2, name: 'Illustrator', description: 'Vector logo systems, monograms & typography assets', percentage: 94, experienceLevel: 'EXPERT', icon: 'Paintbrush', customIcon: '', logo: '', softwareWebsite: 'https://www.adobe.com/products/illustrator.html', yearsExperience: '8 Yrs', isFeatured: true, isVisible: true, displayOrder: 1 },
      { id: 7, categoryId: 2, name: 'Figma', description: 'Design systems, UI kits & interactive digital layouts', percentage: 90, experienceLevel: 'ADVANCED', icon: 'Layout', customIcon: '', logo: '', softwareWebsite: 'https://www.figma.com', yearsExperience: '5 Yrs', isFeatured: true, isVisible: true, displayOrder: 2 },
      { id: 8, categoryId: 2, name: 'Blender 3D', description: '3D product visuals, glassmorphism & Octane rendering', percentage: 82, experienceLevel: 'ADVANCED', icon: 'Layers', customIcon: '', logo: '', softwareWebsite: 'https://www.blender.org', yearsExperience: '4 Yrs', isFeatured: true, isVisible: true, displayOrder: 3 },
      { id: 9, categoryId: 2, name: 'After Effects', description: '2D/3D motion graphics, lower thirds & logo animations', percentage: 92, experienceLevel: 'EXPERT', icon: 'Layers', customIcon: '', logo: '', softwareWebsite: 'https://www.adobe.com/products/aftereffects.html', yearsExperience: '7 Yrs', isFeatured: true, isVisible: true, displayOrder: 4 },
      { id: 10, categoryId: 3, name: 'RED V-Raptor 8K Cinematography', description: 'High dynamic range RAW filming and exposure control', percentage: 92, experienceLevel: 'EXPERT', icon: 'Camera', customIcon: '', logo: '', softwareWebsite: 'https://www.red.com', yearsExperience: '6 Yrs', isFeatured: true, isVisible: true, displayOrder: 0 },
      { id: 11, categoryId: 3, name: 'Sony FX6 Field Rigging', description: 'Low light operation, wireless follow focus & gimbals', percentage: 94, experienceLevel: 'EXPERT', icon: 'Camera', customIcon: '', logo: '', softwareWebsite: 'https://pro.sony', yearsExperience: '7 Yrs', isFeatured: true, isVisible: true, displayOrder: 1 }
    ];
  }

  if (!memoryStore.featured_software) {
    memoryStore.featured_software = [
      { id: 1, name: 'DaVinci Resolve', logo: '/assets/software/davinci.png', websiteUrl: 'https://www.blackmagicdesign.com/products/davinciresolve', category: 'Video', isVisible: true, displayOrder: 0 },
      { id: 2, name: 'Adobe Premiere', logo: '/assets/software/premiere.png', websiteUrl: 'https://www.adobe.com/products/premiere.html', category: 'Video', isVisible: true, displayOrder: 1 },
      { id: 3, name: 'After Effects', logo: '/assets/software/aftereffects.png', websiteUrl: 'https://www.adobe.com/products/aftereffects.html', category: 'Motion', isVisible: true, displayOrder: 2 },
      { id: 4, name: 'Photoshop', logo: '/assets/software/photoshop.png', websiteUrl: 'https://www.adobe.com/products/photoshop.html', category: 'Graphics', isVisible: true, displayOrder: 3 },
      { id: 5, name: 'Illustrator', logo: '/assets/software/illustrator.png', websiteUrl: 'https://www.adobe.com/products/illustrator.html', category: 'Graphics', isVisible: true, displayOrder: 4 },
      { id: 6, name: 'Figma', logo: '/assets/software/figma.png', websiteUrl: 'https://www.figma.com', category: 'UI Design', isVisible: true, displayOrder: 5 },
      { id: 7, name: 'Blender 3D', logo: '/assets/software/blender.png', websiteUrl: 'https://www.blender.org', category: '3D Art', isVisible: true, displayOrder: 6 }
    ];
  }

  if (!memoryStore.work_experiences) {
    memoryStore.work_experiences = [
      {
        id: 1,
        position: 'Founder & Lead Creative Director',
        company: 'Alazar Studio',
        companyLogo: '',
        companyWebsite: 'https://alazar.studio',
        employmentType: 'Full-time',
        startDate: '2022',
        endDate: 'Present',
        isCurrent: true,
        location: 'Global / Remote',
        workMode: 'Remote',
        description: 'Directing, editing, cinematic color grading, and brand identity systems for international fashion labels, tech startups, and independent filmmakers.',
        responsibilities: [
          'Overseeing full project lifecycle from initial pitch and storyboard to final master delivery.',
          'Lead colorist for commercial spots and music videos on RED RAW log workflows.',
          'Designing brand systems, posters, and UI kits for ambitious global brands.'
        ],
        isVisible: true,
        displayOrder: 0
      },
      {
        id: 2,
        position: 'Senior Video Editor & Colorist',
        company: 'Apex Media Group',
        companyLogo: '',
        companyWebsite: '',
        employmentType: 'Full-time',
        startDate: '2020',
        endDate: '2022',
        isCurrent: false,
        location: 'New York, USA (Remote)',
        workMode: 'Remote',
        description: 'Lead video editor and colorist for commercial brand reels and digital campaigns.',
        responsibilities: [
          'Edited over 60 high-converting video commercials for broadcast and digital media.',
          'Established standardized ACES color grading pipeline across the editing team.'
        ],
        isVisible: true,
        displayOrder: 1
      },
      {
        id: 3,
        position: 'Motion Designer & Video Specialist',
        company: 'Studio One Agency',
        companyLogo: '',
        companyWebsite: '',
        employmentType: 'Contract',
        startDate: '2018',
        endDate: '2020',
        isCurrent: false,
        location: 'Remote',
        workMode: 'Remote',
        description: 'Created 2D/3D motion graphics, brand identity packages, and promotional video cuts.',
        responsibilities: [
          'Crafted kinetic typography and motion graphics packages for corporate clients.'
        ],
        isVisible: true,
        displayOrder: 2
      }
    ];
  }

  if (!memoryStore.work_achievements) {
    memoryStore.work_achievements = [
      { id: 1, workExperienceId: 1, title: '140+ Projects Delivered', description: 'Delivered 140+ client projects with a 98% satisfaction rate.', icon: 'CheckCircle2', displayOrder: 0, isVisible: true },
      { id: 2, workExperienceId: 1, title: '4.8M+ Campaign Views', description: 'Led campaign for Vanguard Apparel reaching 4.8M+ views.', icon: 'TrendingUp', displayOrder: 1, isVisible: true },
      { id: 3, workExperienceId: 2, title: 'Standardized Color Pipeline', description: 'Implemented ACES color workflow cutting turnaround time by 30%.', icon: 'Sliders', displayOrder: 0, isVisible: true }
    ];
  }

  if (!memoryStore.awards) {
    memoryStore.awards = [
      { id: 1, title: 'Vimeo Staff Pick', projectName: 'The Craftsman', organization: 'Vimeo', year: '2025', description: 'Honored for exceptional cinematography and slow-paced storytelling.', awardImage: '', awardLogo: '', certificate: '', websiteUrl: 'https://vimeo.com', isFeatured: true, isVisible: true, displayOrder: 0 },
      { id: 2, title: 'Telly Gold Winner', projectName: 'Velocity Commercial', organization: 'The Telly Awards', year: '2024', description: 'Gold award in Commercial Video Editing & Sound Design.', awardImage: '', awardLogo: '', certificate: '', websiteUrl: 'https://tellyawards.com', isFeatured: true, isVisible: true, displayOrder: 1 },
      { id: 3, title: 'Cannes Lions Shortlist', projectName: 'Urban Echoes', organization: 'Cannes Lions International Festival of Creativity', year: '2024', description: 'Shortlisted for Craft in Color Science and Direction.', awardImage: '', awardLogo: '', certificate: '', websiteUrl: '', isFeatured: true, isVisible: true, displayOrder: 2 },
      { id: 4, title: 'Awwwards Site of the Day', projectName: 'Lumina Launch', organization: 'Awwwards', year: '2023', description: 'Awarded for digital graphic design and brand UI excellence.', awardImage: '', awardLogo: '', certificate: '', websiteUrl: 'https://awwwards.com', isFeatured: false, isVisible: true, displayOrder: 3 }
    ];
  }

  if (!memoryStore.availability_status) {
    memoryStore.availability_status = {
      id: 1,
      title: 'Accepting Q3 / Q4 Projects',
      status: 'AVAILABLE',
      description: 'Available Globally — Remote & On-Site Filming Assignments',
      locationAvailability: 'Worldwide / Remote & Travel',
      remoteAvailable: true,
      onSiteAvailable: true,
      startDate: 'Immediate',
      endDate: 'Open',
      isVisible: true
    };
  }

  if (!memoryStore.gear_categories) {
    memoryStore.gear_categories = [
      { id: 1, name: 'Camera Systems', description: 'Flagship 8K & full-frame cinema cameras', icon: 'Camera', image: '', displayOrder: 0, isVisible: true },
      { id: 2, name: 'Lenses & Optics', description: 'Fast prime lenses and cinema glass', icon: 'Film', image: '', displayOrder: 1, isVisible: true },
      { id: 3, name: 'Editing & Color Suite', description: 'Color reference monitors and editing rigs', icon: 'Monitor', image: '', displayOrder: 2, isVisible: true },
      { id: 4, name: 'Lighting & Sound Rig', description: 'High CRI LED panels & wireless audio capture', icon: 'SunMedium', image: '', displayOrder: 3, isVisible: true }
    ];
  }

  if (!memoryStore.production_gears) {
    memoryStore.production_gears = [
      { id: 1, categoryId: 1, name: 'RED V-Raptor 8K VV', manufacturer: 'RED Digital Cinema', model: 'V-Raptor 8K', description: 'Flagship multi-format 8K sensor with 120fps raw recording capabilities.', image: '', badge: 'Primary Cinema Rig', isFeatured: true, isVisible: true, displayOrder: 0, websiteUrl: 'https://www.red.com' },
      { id: 2, categoryId: 1, name: 'Sony FX6 Cinema Line', manufacturer: 'Sony', model: 'FX6', description: 'Full-frame sensor with incredible low-light capability and electronic variable ND.', image: '', badge: 'B-Cam & Documentary', isFeatured: true, isVisible: true, displayOrder: 1, websiteUrl: 'https://pro.sony' },
      { id: 3, categoryId: 2, name: 'Sigma Cine Prime Set', manufacturer: 'Sigma', model: 'T1.5 Primes', description: '24mm, 35mm, 50mm, 85mm T1.5 cinema prime lenses with ultra-sharp resolve.', image: '', badge: 'Cinema Optics', isFeatured: false, isVisible: true, displayOrder: 0, websiteUrl: '' },
      { id: 4, categoryId: 3, name: 'DaVinci Resolve Studio 19 & Speed Editor', manufacturer: 'Blackmagic Design', model: 'Studio 19', description: 'Dedicated color grading station with Flanders Scientific OLED reference display.', image: '', badge: 'Post Suite', isFeatured: true, isVisible: true, displayOrder: 0, websiteUrl: '' }
    ];
  }

  if (!memoryStore.gear_specifications) {
    memoryStore.gear_specifications = [
      { id: 1, gearId: 1, label: 'Resolution', value: '8K VV 8192 x 4320', displayOrder: 0 },
      { id: 2, gearId: 1, label: 'Sensor', value: 'Full Frame 35.4 MP CMOS', displayOrder: 1 },
      { id: 3, gearId: 1, label: 'Format', value: 'REDCODE RAW, ProRes HQ', displayOrder: 2 },
      { id: 4, gearId: 2, label: 'Resolution', value: '4K DCI 4096 x 2160', displayOrder: 0 },
      { id: 5, gearId: 2, label: 'Dynamic Range', value: '15+ Stops', displayOrder: 1 }
    ];
  }

  if (!memoryStore.behind_the_scenes_categories) {
    memoryStore.behind_the_scenes_categories = [
      { id: 1, name: 'On-Set Filming', slug: 'on-set', icon: 'Film', description: 'Directing camera crews and lighting on location', displayOrder: 0, isVisible: true },
      { id: 2, name: 'Color Suite', slug: 'color-suite', icon: 'Sliders', description: 'Color grading sessions in dedicated reference studio', displayOrder: 1, isVisible: true },
      { id: 3, name: 'Aerial Filming', slug: 'aerial', icon: 'Camera', description: 'FPV and cinematic drone footage capture', displayOrder: 2, isVisible: true },
      { id: 4, name: 'Lighting Setup', slug: 'lighting', icon: 'SunMedium', description: 'High-contrast studio lighting control', displayOrder: 3, isVisible: true }
    ];
  }

  if (!memoryStore.behind_the_scenes_media) {
    memoryStore.behind_the_scenes_media = [
      { id: 1, categoryId: 1, title: 'Directing Cinema Cameras on Set', description: 'Operating dual RED V-Raptor rigs on fashion commercial production.', location: 'Studio Studio', image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1000&q=80', video: '', thumbnail: '', altText: 'Directing on set', caption: 'Filming with dual cameras and stabilizer setup.', photographer: 'Alazar Media', projectReference: 'Vanguard Fall Collection', date: '2025', isFeatured: true, isVisible: true, displayOrder: 0 },
      { id: 2, categoryId: 2, title: 'Color Grading Studio Session', description: 'Fine-tuning skin tones and shadows on OLED 4K reference monitor.', location: 'Alazar Suite', image: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=1000&q=80', video: '', thumbnail: '', altText: 'Editing & Color Suite', caption: 'Color grading 8K video on reference monitors.', photographer: 'Alazar Media', projectReference: 'The Craftsman Doc', date: '2025', isFeatured: true, isVisible: true, displayOrder: 1 },
      { id: 3, categoryId: 3, title: 'Cinematic Drone Operations', description: 'Capturing aerial golden hour landscapes for travel commercial.', location: 'Outdoor Location', image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=1000&q=80', video: '', thumbnail: '', altText: 'Aerial Filming', caption: 'Capturing dynamic aerial perspectives.', photographer: 'Alazar Media', projectReference: 'Urban Echoes', date: '2024', isFeatured: false, isVisible: true, displayOrder: 2 },
      { id: 4, categoryId: 4, title: 'Studio Product Lighting Setup', description: 'Precision Aputure LED lighting with softboxes for product shots.', location: 'Main Stage', image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1000&q=80', video: '', thumbnail: '', altText: 'Studio Lighting', caption: 'Setting up key light and bounce diffusion.', photographer: 'Alazar Media', projectReference: 'Lumina Tech Launch', date: '2024', isFeatured: false, isVisible: true, displayOrder: 3 }
    ];
  }

  if (!memoryStore.production_statistics) {
    memoryStore.production_statistics = [
      { id: 1, value: '140', suffix: '+', label: 'Projects Shot', icon: 'Film', description: 'Commercials, shorts, and music videos', isVisible: true, displayOrder: 0 },
      { id: 2, value: '8K', suffix: '', label: 'Max Resolution', icon: 'Camera', description: 'RAW cinema format delivery', isVisible: true, displayOrder: 1 },
      { id: 3, value: '3', suffix: '', label: 'Cinema Cameras', icon: 'Camera', description: 'RED & Sony cinema line rigs', isVisible: true, displayOrder: 2 },
      { id: 4, value: '4', suffix: '', label: 'Continents Filmed', icon: 'MapPin', description: 'Global remote & travel production', isVisible: true, displayOrder: 3 }
    ];
  }

  if (!memoryStore.cta_section) {
    memoryStore.cta_section = {
      id: 1,
      page: 'about',
      title: 'Have a Project in Mind?',
      subtitle: 'Let\'s build high-impact video edits, cinematic color grades, and brand design systems that make your audience stop scrolling.',
      description: 'Whether you need remote post-production or full on-set filming — senior creative execution delivered on deadline.',
      backgroundImage: '',
      backgroundVideo: '',
      primaryButtonText: 'Start a Project',
      primaryButtonLink: '/contact',
      secondaryButtonText: 'View Portfolio',
      secondaryButtonLink: '/portfolio',
      email: 'svga.asdesach1@gmail.com',
      availabilityText: 'Accepting Q3 / Q4 Projects — Global & Remote',
      isVisible: true,
      displayOrder: 0
    };
  }

  if (!memoryStore.cta_benefits) {
    memoryStore.cta_benefits = [
      { id: 1, ctaSectionId: 1, title: '100% On-Time Delivery', icon: 'CheckCircle2', description: 'Clear milestone schedule and guaranteed delivery date', displayOrder: 0, isVisible: true },
      { id: 2, ctaSectionId: 1, title: '8K Master File Delivery', icon: 'Film', description: 'Uncompressed raw masters + vertical social cuts', displayOrder: 1, isVisible: true },
      { id: 3, ctaSectionId: 1, title: 'Video + Design in One', icon: 'Layers', description: 'Cohesive vision across footage and graphics', displayOrder: 2, isVisible: true },
      { id: 4, ctaSectionId: 1, title: 'Reply within 24 Hours', icon: 'Clock', description: 'Fast communication via email, Telegram, or WhatsApp', displayOrder: 3, isVisible: true }
    ];
  }

  if (!memoryStore.contact_information) {
    memoryStore.contact_information = {
      id: 1,
      primaryEmail: 'svga.asdesach1@gmail.com',
      secondaryEmail: 'a.asdesach1@gmail.com',
      phone: '+251 900 000000',
      secondaryPhone: '',
      location: 'Addis Ababa, Ethiopia / Available Globally',
      responseTime: 'Under 24 Hours',
      availabilityText: 'Available for Remote & On-Location Assignments',
      bookingLink: 'https://calendly.com',
      calendlyLink: 'https://calendly.com',
      whatsapp: '+251900000000',
      telegram: '@Onlygrace2',
      isVisible: true
    };
  }

  if (!memoryStore.footer_expertise) {
    memoryStore.footer_expertise = [
      { id: 1, title: 'Commercial Editing', description: 'Paced rhythmic cuts for broadcast', icon: 'Film', displayOrder: 0, isVisible: true },
      { id: 2, title: 'Cinematic Color Grading', description: 'HDR color science & LUT creation', icon: 'Sliders', displayOrder: 1, isVisible: true },
      { id: 3, title: 'Visual Identity & Motion', description: 'Logo systems & 2D/3D motion graphics', icon: 'Palette', displayOrder: 2, isVisible: true },
      { id: 4, title: '3D Product Visuals', description: 'Photorealistic 3D renders', icon: 'Layers', displayOrder: 3, isVisible: true }
    ];
  }

  if (!memoryStore.footer_navigation) {
    memoryStore.footer_navigation = [
      { id: 1, label: 'Home', url: '/', icon: '', openInNewTab: false, displayOrder: 0, isVisible: true },
      { id: 2, label: 'About', url: '/about', icon: '', openInNewTab: false, displayOrder: 1, isVisible: true },
      { id: 3, label: 'Portfolio', url: '/portfolio', icon: '', openInNewTab: false, displayOrder: 2, isVisible: true },
      { id: 4, label: 'Services', url: '/services', icon: '', openInNewTab: false, displayOrder: 3, isVisible: true },
      { id: 5, label: 'Contact', url: '/contact', icon: '', openInNewTab: false, displayOrder: 4, isVisible: true }
    ];
  }

  if (!memoryStore.social_links) {
    memoryStore.social_links = [
      { id: 1, platform: 'Telegram', label: 'Telegram @Onlygrace2', url: 'https://t.me/Onlygrace2', icon: 'Send', customIcon: '', isVisible: true, displayOrder: 0, openInNewTab: true },
      { id: 2, platform: 'Facebook', label: 'Facebook Profile', url: 'https://www.facebook.com/share/169w6Q4Mqo4/?mibextid=wwXIfr', icon: 'Facebook', customIcon: '', isVisible: true, displayOrder: 1, openInNewTab: true },
      { id: 3, platform: 'Facebook', label: 'Facebook Page', url: 'https://www.facebook.com/share/1CMuAk9pQM/?mibextid=wwXIfr', icon: 'Facebook', customIcon: '', isVisible: true, displayOrder: 2, openInNewTab: true }
    ];
  }

  if (!memoryStore.footer_settings) {
    memoryStore.footer_settings = {
      id: 1,
      brandName: 'Alazar.',
      description: 'Crafting clean, cinematic video edits, color grading, and high-impact graphic design solutions for ambitious creators and global brands.',
      copyrightText: '© 2026 Alazar Asdesach. All rights reserved.',
      availabilityTitle: 'Ready to collaborate?',
      availabilityDescription: 'Accepting remote video editing and on-set filming assignments worldwide.',
      logo: '',
      footerBackground: '',
      isVisible: true
    };
  }

  if (!memoryStore.about_page_sections) {
    memoryStore.about_page_sections = [
      { id: 1, sectionKey: 'ABOUT_HERO', titleOverride: 'Hero Profile', subtitleOverride: '', isVisible: true, displayOrder: 0, backgroundStyle: 'default' },
      { id: 2, sectionKey: 'CREATIVE_CAPABILITIES', titleOverride: 'Core Capabilities', subtitleOverride: '', isVisible: true, displayOrder: 1, backgroundStyle: 'default' },
      { id: 3, sectionKey: 'CREATIVE_DISCIPLINE', titleOverride: 'Dual Disciplines', subtitleOverride: '', isVisible: true, displayOrder: 2, backgroundStyle: 'default' },
      { id: 4, sectionKey: 'TECHNICAL_EXPERTISE', titleOverride: 'Software & Skills Matrix', subtitleOverride: '', isVisible: true, displayOrder: 3, backgroundStyle: 'default' },
      { id: 5, sectionKey: 'WORK_HISTORY', titleOverride: 'Career Experience', subtitleOverride: '', isVisible: true, displayOrder: 4, backgroundStyle: 'default' },
      { id: 6, sectionKey: 'PRODUCTION_GEAR', titleOverride: 'Production Gear Kit', subtitleOverride: '', isVisible: true, displayOrder: 5, backgroundStyle: 'default' },
      { id: 7, sectionKey: 'BEHIND_THE_SCENES', titleOverride: 'Behind The Scenes', subtitleOverride: '', isVisible: true, displayOrder: 6, backgroundStyle: 'default' },
      { id: 8, sectionKey: 'AVAILABILITY_CTA', titleOverride: 'Availability & Contact CTA', subtitleOverride: '', isVisible: true, displayOrder: 7, backgroundStyle: 'default' }
    ];
  }
}

// ── Public APIs ─────────────────────────────────────────────────────────────

export const getAboutPageData = async (req, res) => {
  initAboutStore();
  try {
    const data = {
      profile: memoryStore.about_profile,
      media: (memoryStore.profile_media || []).filter(m => m.isVisible).sort((a, b) => a.displayOrder - b.displayOrder),
      capabilities: (memoryStore.creative_capabilities || []).filter(c => c.isVisible).sort((a, b) => a.displayOrder - b.displayOrder),
      disciplines: (memoryStore.creative_disciplines || []).filter(d => d.isVisible).sort((a, b) => a.displayOrder - b.displayOrder).map(d => ({
        ...d,
        expertise: (memoryStore.discipline_expertise || []).filter(e => e.disciplineId === d.id && e.isVisible).sort((a, b) => a.displayOrder - b.displayOrder),
        tags: (memoryStore.discipline_tags || []).filter(t => t.disciplineId === d.id && t.isVisible).sort((a, b) => a.displayOrder - b.displayOrder)
      })),
      statistics: (memoryStore.about_statistics || []).filter(s => s.isVisible).sort((a, b) => a.displayOrder - b.displayOrder),
      skillCategories: (memoryStore.skill_categories || []).filter(sc => sc.isVisible).sort((a, b) => a.displayOrder - b.displayOrder).map(sc => ({
        ...sc,
        skills: (memoryStore.professional_skills || []).filter(sk => sk.categoryId === sc.id && sk.isVisible).sort((a, b) => a.displayOrder - b.displayOrder)
      })),
      software: (memoryStore.featured_software || []).filter(sw => sw.isVisible).sort((a, b) => a.displayOrder - b.displayOrder),
      workExperience: (memoryStore.work_experiences || []).filter(w => w.isVisible).sort((a, b) => a.displayOrder - b.displayOrder).map(w => ({
        ...w,
        achievements: (memoryStore.work_achievements || []).filter(ach => ach.workExperienceId === w.id && ach.isVisible).sort((a, b) => a.displayOrder - b.displayOrder)
      })),
      awards: (memoryStore.awards || []).filter(a => a.isVisible).sort((a, b) => a.displayOrder - b.displayOrder),
      availability: memoryStore.availability_status,
      gearCategories: (memoryStore.gear_categories || []).filter(gc => gc.isVisible).sort((a, b) => a.displayOrder - b.displayOrder).map(gc => ({
        ...gc,
        items: (memoryStore.production_gears || []).filter(g => g.categoryId === gc.id && g.isVisible).sort((a, b) => a.displayOrder - b.displayOrder).map(g => ({
          ...g,
          specs: (memoryStore.gear_specifications || []).filter(spec => spec.gearId === g.id).sort((a, b) => a.displayOrder - b.displayOrder)
        }))
      })),
      behindTheScenes: (memoryStore.behind_the_scenes_categories || []).filter(bc => bc.isVisible).sort((a, b) => a.displayOrder - b.displayOrder).map(bc => ({
        ...bc,
        media: (memoryStore.behind_the_scenes_media || []).filter(m => m.categoryId === bc.id && m.isVisible).sort((a, b) => a.displayOrder - b.displayOrder)
      })),
      productionStats: (memoryStore.production_statistics || []).filter(ps => ps.isVisible).sort((a, b) => a.displayOrder - b.displayOrder),
      cta: {
        ...memoryStore.cta_section,
        benefits: (memoryStore.cta_benefits || []).filter(b => b.isVisible).sort((a, b) => a.displayOrder - b.displayOrder)
      },
      contact: {
        ...memoryStore.contact_information,
        socialLinks: (memoryStore.social_links || []).filter(sl => sl.isVisible).sort((a, b) => a.displayOrder - b.displayOrder)
      },
      footer: {
        ...memoryStore.footer_settings,
        expertise: (memoryStore.footer_expertise || []).filter(fe => fe.isVisible).sort((a, b) => a.displayOrder - b.displayOrder),
        navigation: (memoryStore.footer_navigation || []).filter(fn => fn.isVisible).sort((a, b) => a.displayOrder - b.displayOrder)
      },
      sections: (memoryStore.about_page_sections || []).sort((a, b) => a.displayOrder - b.displayOrder)
    };

    return res.json({ success: true, data });
  } catch (err) {
    console.error('[About API] Error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ── Admin CRUD APIs ─────────────────────────────────────────────────────────

export const getAdminAboutFullData = async (req, res) => {
  initAboutStore();
  return res.json({ success: true, data: memoryStore });
};

// Profile & Hero
export const updateAboutProfile = async (req, res) => {
  initAboutStore();
  memoryStore.about_profile = { ...memoryStore.about_profile, ...req.body, updatedAt: new Date().toISOString() };
  saveMemoryStoreToDisk();
  return res.json({ success: true, message: 'About profile updated successfully', data: memoryStore.about_profile });
};

// Generic CRUD helper generator for simple collections
const createCrudHandlers = (storeKey, itemName = 'Item') => ({
  create: async (req, res) => {
    initAboutStore();
    const list = memoryStore[storeKey] || (memoryStore[storeKey] = []);
    const newItem = { id: Date.now(), isVisible: true, displayOrder: list.length, ...req.body };
    list.push(newItem);
    saveMemoryStoreToDisk();
    return res.status(201).json({ success: true, message: `${itemName} created successfully`, data: newItem });
  },
  update: async (req, res) => {
    initAboutStore();
    const id = parseInt(req.params.id, 10);
    const list = memoryStore[storeKey] || [];
    const idx = list.findIndex(item => item.id === id);
    if (idx === -1) return res.status(404).json({ success: false, message: `${itemName} not found` });
    list[idx] = { ...list[idx], ...req.body };
    saveMemoryStoreToDisk();
    return res.json({ success: true, message: `${itemName} updated successfully`, data: list[idx] });
  },
  delete: async (req, res) => {
    initAboutStore();
    const id = parseInt(req.params.id, 10);
    const list = memoryStore[storeKey] || [];
    const idx = list.findIndex(item => item.id === id);
    if (idx === -1) return res.status(404).json({ success: false, message: `${itemName} not found` });
    const deleted = list.splice(idx, 1);
    saveMemoryStoreToDisk();
    return res.json({ success: true, message: `${itemName} deleted successfully`, data: deleted[0] });
  },
  toggleVisibility: async (req, res) => {
    initAboutStore();
    const id = parseInt(req.params.id, 10);
    const list = memoryStore[storeKey] || [];
    const item = list.find(x => x.id === id);
    if (!item) return res.status(404).json({ success: false, message: `${itemName} not found` });
    item.isVisible = !item.isVisible;
    saveMemoryStoreToDisk();
    return res.json({ success: true, message: `${itemName} visibility toggled`, data: item });
  },
  reorder: async (req, res) => {
    initAboutStore();
    const { items } = req.body; // array of { id, displayOrder }
    if (Array.isArray(items)) {
      const list = memoryStore[storeKey] || [];
      items.forEach(({ id, displayOrder }) => {
        const item = list.find(x => x.id === id);
        if (item) item.displayOrder = displayOrder;
      });
      saveMemoryStoreToDisk();
    }
    return res.json({ success: true, message: `${itemName} reordered successfully` });
  }
});

export const capabilityCrud = createCrudHandlers('creative_capabilities', 'Capability');
export const disciplineCrud = createCrudHandlers('creative_disciplines', 'Discipline');
export const expertiseCrud = createCrudHandlers('discipline_expertise', 'Expertise');
export const tagCrud = createCrudHandlers('discipline_tags', 'Tag');
export const statisticCrud = createCrudHandlers('about_statistics', 'Statistic');
export const skillCategoryCrud = createCrudHandlers('skill_categories', 'Skill Category');
export const skillCrud = createCrudHandlers('professional_skills', 'Skill');
export const softwareCrud = createCrudHandlers('featured_software', 'Software');
export const workExperienceCrud = createCrudHandlers('work_experiences', 'Work Experience');
export const achievementCrud = createCrudHandlers('work_achievements', 'Achievement');
export const awardCrud = createCrudHandlers('awards', 'Award');
export const gearCategoryCrud = createCrudHandlers('gear_categories', 'Gear Category');
export const gearCrud = createCrudHandlers('production_gears', 'Production Gear');
export const btsCategoryCrud = createCrudHandlers('behind_the_scenes_categories', 'BTS Category');
export const btsMediaCrud = createCrudHandlers('behind_the_scenes_media', 'BTS Media');
export const ctaBenefitCrud = createCrudHandlers('cta_benefits', 'CTA Benefit');
export const socialLinkCrud = createCrudHandlers('social_links', 'Social Link');
export const sectionCrud = createCrudHandlers('about_page_sections', 'Page Section');

// Special single-record update handlers
export const updateAvailability = async (req, res) => {
  initAboutStore();
  memoryStore.availability_status = { ...memoryStore.availability_status, ...req.body };
  saveMemoryStoreToDisk();
  return res.json({ success: true, message: 'Availability updated', data: memoryStore.availability_status });
};

export const updateCtaSection = async (req, res) => {
  initAboutStore();
  memoryStore.cta_section = { ...memoryStore.cta_section, ...req.body };
  saveMemoryStoreToDisk();
  return res.json({ success: true, message: 'CTA section updated', data: memoryStore.cta_section });
};

export const updateContactInformation = async (req, res) => {
  initAboutStore();
  memoryStore.contact_information = { ...memoryStore.contact_information, ...req.body };
  saveMemoryStoreToDisk();
  return res.json({ success: true, message: 'Contact info updated', data: memoryStore.contact_information });
};

export const updateFooterSettings = async (req, res) => {
  initAboutStore();
  memoryStore.footer_settings = { ...memoryStore.footer_settings, ...req.body };
  saveMemoryStoreToDisk();
  return res.json({ success: true, message: 'Footer settings updated', data: memoryStore.footer_settings });
};
