"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import {
  createCoverTexture,
  createSpineTexture,
  createBackCoverTexture,
  createPageEdgesTexture,
  createCheckerboardTexture,
} from "./bookTextures";
import {
  createLeftPageTexture,
  createRightPageTexture,
} from "./pageTextures";
import { useBook } from "@/context/BookContext";
import { resumeData } from "@/data/resumeData";

export default function BookScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isBookOpen, openBook, nextPage, prevPage, goToSpread, currentSpread } = useBook();

  const isBookOpenRef = useRef(isBookOpen);
  isBookOpenRef.current = isBookOpen;

  const currentSpreadRef = useRef(currentSpread);
  currentSpreadRef.current = currentSpread;

  // Ref to update page textures on the 3D book when currentSpread changes
  const updateSpreadTexturesRef = useRef<((spread: number) => void) | null>(null);

  useEffect(() => {
    if (updateSpreadTexturesRef.current) {
      updateSpreadTexturesRef.current(currentSpread);
    }
  }, [currentSpread]);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // Mobile device detection for GPU memory and touch optimizations
    const isMobile =
      typeof window !== "undefined" &&
      (window.innerWidth < 768 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));

    // 1. Scene, Camera, Renderer, Clock
    const clock = new THREE.Clock();
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#111112");

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // Studio Perspective Camera
    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 60);
    camera.position.set(0, 0.35, isMobile ? 8.6 : 7.8);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.LinearToneMapping;
    renderer.toneMappingExposure = 1.0;

    container.appendChild(renderer.domElement);

    // 2. Studio Lighting (Natural studio key + soft fill + ambient light)
    const ambientLight = new THREE.AmbientLight("#FFFDF7", 0.95);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight("#FFF9F0", 1.5);
    keyLight.position.set(4.2, 7.5, 5.0);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = isMobile ? 1024 : 2048;
    keyLight.shadow.mapSize.height = isMobile ? 1024 : 2048;
    keyLight.shadow.camera.near = 1;
    keyLight.shadow.camera.far = 20;
    keyLight.shadow.camera.left = -5;
    keyLight.shadow.camera.right = 5;
    keyLight.shadow.camera.top = 5;
    keyLight.shadow.camera.bottom = -5;
    keyLight.shadow.bias = -0.00015;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight("#EAE5DA", 0.55);
    fillLight.position.set(-4.5, 3.2, 3.5);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight("#FAF6EE", 0.35);
    rimLight.position.set(0, 6, -3.5);
    scene.add(rimLight);

    // 3. Studio Cyclorama Backdrop (Black & Off-White Checkerboard)
    const widthSegments = 40;
    const lengthSegments = 80;
    const coveWidth = 44;
    const profilePoints: { z: number; y: number; arcLength: number }[] = [];
    const numPoints = lengthSegments + 1;

    let cumulativeLength = 0;
    let prevZ = 16;
    let prevY = -2.6;

    for (let i = 0; i < numPoints; i++) {
      const t = i / lengthSegments;
      let z = 0;
      let y = 0;

      if (t < 0.42) {
        // Flat floor section
        const subT = t / 0.42;
        z = 16 - subT * 16.8;
        y = -2.6;
      } else if (t < 0.72) {
        // Smooth curved cove transition
        const subT = (t - 0.42) / 0.3;
        const angle = subT * (Math.PI / 2);
        z = -0.8 - (1 - Math.cos(angle)) * 5.2;
        y = -2.6 + Math.sin(angle) * 7.0;
      } else {
        // Vertical back wall
        const subT = (t - 0.72) / 0.28;
        z = -6.0;
        y = 4.4 + subT * 18.0;
      }

      if (i > 0) {
        cumulativeLength += Math.hypot(z - prevZ, y - prevY);
      }
      prevZ = z;
      prevY = y;
      profilePoints.push({ z, y, arcLength: cumulativeLength });
    }

    const vertices: number[] = [];
    const uvs: number[] = [];
    const indices: number[] = [];
    const tileSize = 2.45;

    for (let i = 0; i <= lengthSegments; i++) {
      const { z, y, arcLength } = profilePoints[i];
      const v = (arcLength + 0.6) / tileSize;

      for (let j = 0; j <= widthSegments; j++) {
        const uRatio = j / widthSegments;
        const x = -coveWidth / 2 + uRatio * coveWidth;
        const u = x / tileSize + 0.5;

        vertices.push(x, y, z);
        uvs.push(u, v);
      }
    }

    const rowStride = widthSegments + 1;
    for (let i = 0; i < lengthSegments; i++) {
      for (let j = 0; j < widthSegments; j++) {
        const a = i * rowStride + j;
        const b = (i + 1) * rowStride + j;
        const c = (i + 1) * rowStride + (j + 1);
        const d = i * rowStride + (j + 1);
        indices.push(a, b, d);
        indices.push(b, c, d);
      }
    }

    const coveGeometry = new THREE.BufferGeometry();
    coveGeometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    coveGeometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
    coveGeometry.setIndex(indices);
    coveGeometry.computeVertexNormals();

    const checkerTexture = createCheckerboardTexture();
    const coveMaterial = new THREE.MeshStandardMaterial({
      map: checkerTexture,
      roughness: 0.88,
      metalness: 0.02,
      side: THREE.DoubleSide,
    });

    const backdropMesh = new THREE.Mesh(coveGeometry, coveMaterial);
    backdropMesh.receiveShadow = true;
    scene.add(backdropMesh);

    // 4. 3D Hardcover Book (Burnt Orange with Realistic Overhang & Paper Edges)
    const bookGroup = new THREE.Group();
    bookGroup.position.set(0, 0.38, 0);
    scene.add(bookGroup);

    // Hardcover dimensions
    const coverWidth = 2.12;
    const coverHeight = 3.12;
    const bookThickness = 0.44;
    const coverThickness = 0.038;

    // Real paper pages block dimensions
    const pageOverhang = 0.045;
    const pageWidth = coverWidth - pageOverhang;
    const pageHeight = coverHeight - pageOverhang * 2;
    const pagesThickness = bookThickness - coverThickness * 2;

    const coverTex = createCoverTexture();
    const spineTex = createSpineTexture();
    const backCoverTex = createBackCoverTexture();
    const pagesTex = createPageEdgesTexture();

    const neutralWhite = new THREE.Color("#FFFFFF");
    const paperWarm = new THREE.Color("#FAF6ED");
    const rimLeatherColor = new THREE.Color("#D64F14");

    const frontCoverMat = new THREE.MeshStandardMaterial({
      map: coverTex,
      color: neutralWhite,
      roughness: 0.65,
      metalness: 0.02,
    });

    const endpaperMat = new THREE.MeshStandardMaterial({
      color: paperWarm,
      roughness: 0.85,
      metalness: 0.01,
    });

    const spineMat = new THREE.MeshStandardMaterial({
      map: spineTex,
      color: neutralWhite,
      roughness: 0.68,
      metalness: 0.02,
    });

    const backCoverMat = new THREE.MeshStandardMaterial({
      map: backCoverTex,
      color: neutralWhite,
      roughness: 0.65,
      metalness: 0.02,
    });

    const pageEdgesMat = new THREE.MeshStandardMaterial({
      map: pagesTex,
      roughness: 0.88,
      metalness: 0.01,
    });

    const coverRimMat = new THREE.MeshStandardMaterial({
      color: rimLeatherColor,
      roughness: 0.68,
      metalness: 0.02,
    });

    // 4a. Back Cover Board
    const backCoverGeom = new THREE.BoxGeometry(coverWidth, coverHeight, coverThickness);
    const backCoverMesh = new THREE.Mesh(backCoverGeom, [
      coverRimMat,
      coverRimMat,
      coverRimMat,
      coverRimMat,
      endpaperMat,  // Inner face (+Z, facing inside towards pages)
      backCoverMat, // Outer face (-Z, facing outside to the back of the book)
    ]);
    backCoverMesh.position.set(0, 0, -bookThickness / 2 + coverThickness / 2);
    backCoverMesh.castShadow = true;
    backCoverMesh.receiveShadow = true;
    bookGroup.add(backCoverMesh);

    // 4b. Spine (Curved left edge at x = -coverWidth / 2)
    const spineGeom = new THREE.BoxGeometry(coverThickness * 1.15, coverHeight, bookThickness);
    const spineMesh = new THREE.Mesh(spineGeom, [
      coverRimMat,
      spineMat,
      coverRimMat,
      coverRimMat,
      coverRimMat,
      coverRimMat,
    ]);
    spineMesh.position.set(-coverWidth / 2 + coverThickness / 2, 0, 0);
    spineMesh.castShadow = true;
    spineMesh.receiveShadow = true;
    bookGroup.add(spineMesh);

    // 4c. Realistic Pages Block
    const pagesGeom = new THREE.BoxGeometry(pageWidth, pageHeight, pagesThickness);
    const pagesMesh = new THREE.Mesh(pagesGeom, [
      pageEdgesMat, // Right fore-edge
      coverRimMat,  // Left bound inside spine
      pageEdgesMat, // Top edge
      pageEdgesMat, // Bottom edge
      endpaperMat,  // Front facing page
      endpaperMat,  // Back facing page
    ]);
    // Page block aligns from spine (x = -coverWidth / 2) outward to the right
    pagesMesh.position.set(-coverWidth / 2 + pageWidth / 2, 0, 0);
    pagesMesh.castShadow = true;
    pagesMesh.receiveShadow = true;
    bookGroup.add(pagesMesh);

    // 4d. Front Cover Board (Hinged along left spine edge at x = -coverWidth / 2)
    const frontCoverPivot = new THREE.Group();
    frontCoverPivot.position.set(-coverWidth / 2, 0, bookThickness / 2 - coverThickness / 2);
    bookGroup.add(frontCoverPivot);

    const frontCoverGeom = new THREE.BoxGeometry(coverWidth, coverHeight, coverThickness);
    const frontCoverMesh = new THREE.Mesh(frontCoverGeom, [
      coverRimMat,
      coverRimMat,
      coverRimMat,
      coverRimMat,
      frontCoverMat, // Outer face
      endpaperMat,   // Inner face
    ]);
    frontCoverMesh.position.set(coverWidth / 2, 0, 0);
    frontCoverMesh.castShadow = true;
    frontCoverMesh.receiveShadow = true;
    frontCoverPivot.add(frontCoverMesh);

    // 4e. Headband Detail
    const headbandMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#FFFFFF"),
      roughness: 0.9,
    });
    const headbandGeom = new THREE.CylinderGeometry(0.04, 0.04, pagesThickness * 0.9, 12);
    headbandGeom.rotateX(Math.PI / 2);
    const topHeadband = new THREE.Mesh(headbandGeom, headbandMat);
    topHeadband.position.set(-coverWidth / 2 + 0.12, pageHeight / 2, 0);
    bookGroup.add(topHeadband);

    // 4f. REALISTIC WARM OFF-WHITE PAGES & 3D TURNING PAGE CONTROLLER
    const leftTexturesCache = new Map<number, THREE.CanvasTexture>();
    const rightTexturesCache = new Map<number, THREE.CanvasTexture>();
    const backTexturesCache = new Map<string, THREE.CanvasTexture>();

    const getLeftTex = (spread: number): THREE.CanvasTexture | null => {
      let tex = leftTexturesCache.get(spread);
      if (!tex) {
        // On mobile, limit cached textures to 4 to prevent WebGL context lost out-of-memory
        if (isMobile && leftTexturesCache.size >= 4) {
          const firstKey = leftTexturesCache.keys().next().value;
          if (firstKey !== undefined && firstKey !== currentSpreadRef.current) {
            leftTexturesCache.get(firstKey)?.dispose();
            leftTexturesCache.delete(firstKey);
          }
        }
        const created = createLeftPageTexture(spread);
        if (created) {
          leftTexturesCache.set(spread, created);
          tex = created;
        }
      }
      return tex || null;
    };

    const getRightTex = (spread: number): THREE.CanvasTexture | null => {
      let tex = rightTexturesCache.get(spread);
      if (!tex) {
        if (isMobile && rightTexturesCache.size >= 4) {
          const firstKey = rightTexturesCache.keys().next().value;
          if (firstKey !== undefined && firstKey !== currentSpreadRef.current) {
            rightTexturesCache.get(firstKey)?.dispose();
            rightTexturesCache.delete(firstKey);
          }
        }
        const created = createRightPageTexture(spread);
        if (created) {
          rightTexturesCache.set(spread, created);
          tex = created;
        }
      }
      return tex || null;
    };

    const getInvertedTex = (sourceTex: THREE.CanvasTexture, key: string): THREE.CanvasTexture => {
      let clone = backTexturesCache.get(key);
      if (!clone) {
        clone = sourceTex.clone();
        clone.repeat.x = -1;
        clone.offset.x = 1;
        clone.needsUpdate = true;
        backTexturesCache.set(key, clone);
      }
      return clone;
    };

    const leftPageGeom = new THREE.PlaneGeometry(pageWidth, pageHeight);
    const rightPageGeom = new THREE.PlaneGeometry(pageWidth, pageHeight);

    const leftPageMat = new THREE.MeshStandardMaterial({
      map: getLeftTex(currentSpreadRef.current),
      roughness: 0.92,
      metalness: 0.01,
      side: THREE.DoubleSide,
    });

    const rightPageMat = new THREE.MeshStandardMaterial({
      map: getRightTex(currentSpreadRef.current),
      roughness: 0.92,
      metalness: 0.01,
      side: THREE.DoubleSide,
    });

    // Re-render textures when web fonts finish downloading
    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(() => {
        leftTexturesCache.forEach((t) => t.dispose());
        rightTexturesCache.forEach((t) => t.dispose());
        backTexturesCache.forEach((t) => t.dispose());
        leftTexturesCache.clear();
        rightTexturesCache.clear();
        backTexturesCache.clear();

        const newCover = createCoverTexture();
        if (newCover && frontCoverMat) {
          frontCoverMat.map = newCover;
          frontCoverMat.needsUpdate = true;
        }

        const newBack = createBackCoverTexture();
        if (newBack && backCoverMat) {
          backCoverMat.map = newBack;
          backCoverMat.needsUpdate = true;
        }

        const curL = getLeftTex(currentSpreadRef.current);
        const curR = getRightTex(currentSpreadRef.current);
        if (curL && leftPageMat) {
          leftPageMat.map = curL;
          leftPageMat.needsUpdate = true;
        }
        if (curR && rightPageMat) {
          rightPageMat.map = curR;
          rightPageMat.needsUpdate = true;
        }
      });
    }

    // Right Page: Mounts on top of page block, starting right at spine hinge (-coverWidth / 2)
    const rightPageMesh = new THREE.Mesh(rightPageGeom, rightPageMat);
    rightPageMesh.position.set(0, 0, pagesThickness / 2 + 0.003);
    pagesMesh.add(rightPageMesh);

    // Left Page: Mounts on inner face of front cover, meeting right at the spine hinge with ZERO gap
    const leftPageMesh = new THREE.Mesh(leftPageGeom, leftPageMat);
    leftPageMesh.position.set(pageWidth / 2, 0, -coverThickness / 2 - 0.003);
    leftPageMesh.rotation.y = Math.PI; // Inverted so it faces forward when cover opens 180 deg
    frontCoverPivot.add(leftPageMesh);

    // 4g. DYNAMIC 3D TURNING PAGE SHEET
    const turnSegmentsX = 32;
    const turnGeom = new THREE.PlaneGeometry(pageWidth, pageHeight, turnSegmentsX, 2);
    turnGeom.translate(pageWidth / 2, 0, 0); // Spine hinge is at local x = 0
    const origTurnPositions = Float32Array.from(turnGeom.attributes.position.array);

    const turningPivot = new THREE.Group();
    turningPivot.position.set(-coverWidth / 2, 0, pagesThickness / 2 + 0.005);
    turningPivot.visible = false;
    bookGroup.add(turningPivot);

    const turningFrontMat = new THREE.MeshStandardMaterial({
      roughness: 0.92,
      metalness: 0.01,
      side: THREE.FrontSide,
    });
    const turningFrontMesh = new THREE.Mesh(turnGeom, turningFrontMat);
    turningFrontMesh.position.z = 0.001;
    turningFrontMesh.castShadow = true;
    turningPivot.add(turningFrontMesh);

    const turningBackMat = new THREE.MeshStandardMaterial({
      roughness: 0.92,
      metalness: 0.01,
      side: THREE.BackSide,
    });
    const turningBackMesh = new THREE.Mesh(turnGeom, turningBackMat);
    turningBackMesh.position.z = -0.001;
    turningBackMesh.castShadow = true;
    turningPivot.add(turningBackMesh);

    // Flip animation state
    let isPageFlipping = false;
    let flipStartTime = 0;
    const flipDuration = 0.58; // 580ms turning duration
    let flipDirection: "forward" | "backward" = "forward";
    let flipTargetSpread = currentSpreadRef.current;
    let activeFromSpread = currentSpreadRef.current;

    const startPageFlip = (fromSpread: number, toSpread: number) => {
      if (fromSpread === toSpread) return;

      // Finish ongoing flip immediately if rapid clicking occurs
      if (isPageFlipping) {
        isPageFlipping = false;
        turningPivot.visible = false;
        const curL = getLeftTex(flipTargetSpread);
        const curR = getRightTex(flipTargetSpread);
        if (curL) { leftPageMat.map = curL; leftPageMat.needsUpdate = true; }
        if (curR) { rightPageMat.map = curR; rightPageMat.needsUpdate = true; }
        fromSpread = flipTargetSpread;
      }

      flipTargetSpread = toSpread;
      activeFromSpread = fromSpread;
      flipStartTime = clock.getElapsedTime();

      const isForward = toSpread > fromSpread;
      flipDirection = isForward ? "forward" : "backward";

      if (isForward) {
        // Forward turn: Right page lifts up, flips over to the left
        const frontTex = getRightTex(fromSpread);
        if (frontTex) turningFrontMat.map = frontTex;

        const backSource = getLeftTex(toSpread);
        if (backSource) {
          turningBackMat.map = getInvertedTex(backSource, `left_inv_${toSpread}`);
        }

        const curLeft = getLeftTex(fromSpread);
        if (curLeft) {
          leftPageMat.map = curLeft;
          leftPageMat.needsUpdate = true;
        }

        const nextRight = getRightTex(toSpread);
        if (nextRight) {
          rightPageMat.map = nextRight;
          rightPageMat.needsUpdate = true;
        }

        turningPivot.rotation.y = 0;
      } else {
        // Backward turn: Left page lifts up, flips over to the right
        const backSource = getLeftTex(fromSpread);
        if (backSource) {
          turningBackMat.map = getInvertedTex(backSource, `left_inv_${fromSpread}`);
        }

        const frontTex = getRightTex(toSpread);
        if (frontTex) turningFrontMat.map = frontTex;

        const nextLeft = getLeftTex(toSpread);
        if (nextLeft) {
          leftPageMat.map = nextLeft;
          leftPageMat.needsUpdate = true;
        }

        const curRight = getRightTex(fromSpread);
        if (curRight) {
          rightPageMat.map = curRight;
          rightPageMat.needsUpdate = true;
        }

        turningPivot.rotation.y = -Math.PI;
      }

      turningPivot.visible = true;
      isPageFlipping = true;
    };

    // Function to dynamically update page textures when user flips pages
    updateSpreadTexturesRef.current = (newSpread: number) => {
      const oldSpread = activeFromSpread;
      if (!isBookOpenRef.current) {
        activeFromSpread = newSpread;
        flipTargetSpread = newSpread;
        const lTex = getLeftTex(newSpread);
        const rTex = getRightTex(newSpread);
        if (lTex) { leftPageMat.map = lTex; leftPageMat.needsUpdate = true; }
        if (rTex) { rightPageMat.map = rTex; rightPageMat.needsUpdate = true; }
      } else {
        startPageFlip(oldSpread, newSpread);
      }
    };

    // 4g. Soft Floor Contact Shadow
    const shadowGeom = new THREE.PlaneGeometry(2.8, 3.8);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: "#000000",
      transparent: true,
      opacity: 0.28,
      depthWrite: false,
    });
    const floorShadow = new THREE.Mesh(shadowGeom, shadowMat);
    floorShadow.rotation.x = -Math.PI / 2;
    floorShadow.position.set(0, -2.59, 0.3);
    scene.add(floorShadow);

    // 5. 360-Degree Interactive Drag & Orbit Rotation
    let isDragging = false;
    let hasDragged = false;
    const previousPointer = { x: 0, y: 0 };
    const startPointer = { x: 0, y: 0 };

    let dragRotY = -0.15;
    let dragRotX = 0.08;
    let rotVelocityY = 0;
    let rotVelocityX = 0;

    const mouseParallax = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    const interactiveMeshes = [frontCoverMesh, pagesMesh, backCoverMesh, spineMesh, leftPageMesh, rightPageMesh];

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      hasDragged = false;
      const clientX = "touches" in e && e.touches.length > 0 ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = "touches" in e && e.touches.length > 0 ? e.touches[0].clientY : (e as MouseEvent).clientY;

      previousPointer.x = clientX;
      previousPointer.y = clientY;
      startPointer.x = clientX;
      startPointer.y = clientY;
      rotVelocityY = 0;
      rotVelocityX = 0;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e && e.touches.length > 0 ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = "touches" in e && e.touches.length > 0 ? e.touches[0].clientY : (e as MouseEvent).clientY;

      if (isDragging) {
        const deltaX = clientX - previousPointer.x;
        const deltaY = clientY - previousPointer.y;

        if (Math.hypot(clientX - startPointer.x, clientY - startPointer.y) > 6) {
          hasDragged = true;
        }

        if (!isBookOpenRef.current) {
          // Free 360 degree rotation when closed
          dragRotY += deltaX * 0.012;
          rotVelocityY = deltaX * 0.012;
          dragRotX = THREE.MathUtils.clamp(dragRotX + deltaY * 0.008, -0.65, 0.65);
          rotVelocityX = deltaY * 0.008;
        } else {
          // Subtle inspection tilt when open
          dragRotY = THREE.MathUtils.clamp(dragRotY + deltaX * 0.004, -0.35, 0.35);
          dragRotX = THREE.MathUtils.clamp(dragRotX + deltaY * 0.004, -0.25, 0.25);
        }

        previousPointer.x = clientX;
        previousPointer.y = clientY;
      } else {
        mouseParallax.targetX = (clientX / window.innerWidth) * 2 - 1;
        mouseParallax.targetY = -(clientY / window.innerHeight) * 2 + 1;

        pointer.x = mouseParallax.targetX;
        pointer.y = mouseParallax.targetY;
        raycaster.setFromCamera(pointer, camera);

        const intersects = raycaster.intersectObjects(interactiveMeshes, true);
        if (!isBookOpenRef.current) {
          document.body.style.cursor = intersects.length > 0 ? "grab" : "default";
        } else {
          document.body.style.cursor = intersects.length > 0 ? "pointer" : "default";
        }
      }
    };

    const onPointerUp = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      isDragging = false;

      // Click detected without significant drag movement
      if (!hasDragged) {
        const clientX = "changedTouches" in e && e.changedTouches.length > 0 ? e.changedTouches[0].clientX : (e as MouseEvent).clientX;
        const clientY = "changedTouches" in e && e.changedTouches.length > 0 ? e.changedTouches[0].clientY : (e as MouseEvent).clientY;

        pointer.x = (clientX / window.innerWidth) * 2 - 1;
        pointer.y = -(clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(pointer, camera);

        if (!isBookOpenRef.current) {
          const intersects = raycaster.intersectObjects(interactiveMeshes, true);
          if (intersects.length > 0) {
            openBook();
          }
        } else {
          // When open:
          const intersectsRight = raycaster.intersectObject(rightPageMesh, true);
          const intersectsLeft = raycaster.intersectObject(leftPageMesh, true);

          if (intersectsRight.length > 0) {
            const hit = intersectsRight[0];
            const uv = hit.uv;

            // Interactive TOC links on Spread 1
            if (currentSpreadRef.current === 1 && uv) {
              if (uv.y >= 0.82 && uv.y <= 0.89) {
                goToSpread(2); // Chapter 01
                return;
              } else if (uv.y >= 0.76 && uv.y < 0.82) {
                goToSpread(3); // Chapter 02
                return;
              } else if (uv.y >= 0.70 && uv.y < 0.76) {
                goToSpread(4); // Chapter 03
                return;
              } else if (uv.y >= 0.64 && uv.y < 0.70) {
                goToSpread(5); // Chapter 04
                return;
              } else if (uv.y >= 0.58 && uv.y < 0.64) {
                goToSpread(6); // Chapter 05
                return;
              } else if (uv.y >= 0.50 && uv.y < 0.58) {
                goToSpread(7); // Chapter 06 Be a Co-Author
                return;
              }
            }

            // Interactive Project Repository Links on Spread 4 (Chapter 03 Projects)
            if (currentSpreadRef.current === 4 && uv) {
              if (uv.x >= 0.10 && uv.x <= 0.92) {
                // Project A: Cloud Misconfiguration Risk Analyzer
                if (uv.y >= 0.56 && uv.y <= 0.63) {
                  const url = resumeData.chapters.projects.right.items[0]?.githubUrl;
                  if (url) {
                    window.open(url, "_blank", "noopener,noreferrer");
                    return;
                  }
                }
                // Project B: SecureReceipt
                if (uv.y >= 0.26 && uv.y <= 0.33) {
                  const url = resumeData.chapters.projects.right.items[1]?.githubUrl;
                  if (url) {
                    window.open(url, "_blank", "noopener,noreferrer");
                    return;
                  }
                }
              }
            }

            // Interactive Contact Links on Spread 6 (Chapter 05 Contact)
            if (currentSpreadRef.current === 6 && uv) {
              if (uv.x >= 0.10 && uv.x <= 0.92) {
                // Electronic Mail
                if (uv.y >= 0.720 && uv.y <= 0.795) {
                  const email = resumeData.chapters.contact.right.email;
                  if (email) {
                    window.location.href = `mailto:${email}`;
                    return;
                  }
                }
                // LinkedIn Network
                if (uv.y >= 0.640 && uv.y < 0.720) {
                  const linkedinUrl = resumeData.chapters.contact.right.linkedinUrl;
                  if (linkedinUrl) {
                    window.open(linkedinUrl, "_blank", "noopener,noreferrer");
                    return;
                  }
                }
                // Source Code Archive (GitHub)
                if (uv.y >= 0.555 && uv.y < 0.640) {
                  const githubUrl = resumeData.chapters.contact.right.githubUrl;
                  if (githubUrl) {
                    window.open(githubUrl, "_blank", "noopener,noreferrer");
                    return;
                  }
                }
              }
            }

            // Interactive Action Buttons on Spread 7 (Chapter 06 Be a Co-Author)
            if (currentSpreadRef.current === 7 && uv) {
              if (uv.x >= 0.10 && uv.x <= 0.92 && uv.y >= 0.475 && uv.y <= 0.545) {
                if (uv.x <= 0.51) {
                  window.open(resumeData.chapters.coAuthor.right.linkedinUrl, "_blank", "noopener,noreferrer");
                  return;
                } else {
                  window.location.href = resumeData.chapters.coAuthor.right.emailUrl;
                  return;
                }
              }
            }

            // Normal right page turn
            nextPage();
          } else if (intersectsLeft.length > 0) {
            prevPage();
          }
        }
      }
    };

    const onTouchCancel = () => {
      isDragging = false;
    };

    window.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mousemove", onPointerMove, { passive: true });
    window.addEventListener("mouseup", onPointerUp);

    window.addEventListener("touchstart", onPointerDown, { passive: true });
    window.addEventListener("touchmove", onPointerMove, { passive: true });
    window.addEventListener("touchend", onPointerUp);
    window.addEventListener("touchcancel", onTouchCancel);

    // 6. Resize Handler
    const onResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", onResize);

    // 7. Animation Loop (60-120fps with Zero React Re-renders)
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (!isDragging && !isBookOpenRef.current) {
        dragRotY += rotVelocityY;
        dragRotX = THREE.MathUtils.clamp(dragRotX + rotVelocityX, -0.65, 0.65);
        rotVelocityY *= 0.92;
        rotVelocityX *= 0.92;
      }

      mouseParallax.x = THREE.MathUtils.lerp(mouseParallax.x, mouseParallax.targetX, 0.06);
      mouseParallax.y = THREE.MathUtils.lerp(mouseParallax.y, mouseParallax.targetY, 0.06);

      const open = isBookOpenRef.current;

      if (!open) {
        // Floating closed book
        const floatY = 0.38 + Math.sin(elapsed * 1.5) * 0.07;

        bookGroup.position.y = THREE.MathUtils.lerp(bookGroup.position.y, floatY, 0.08);
        bookGroup.position.x = THREE.MathUtils.lerp(bookGroup.position.x, 0, 0.08);
        bookGroup.position.z = THREE.MathUtils.lerp(bookGroup.position.z, 0, 0.08);

        // Responsive camera distance so the closed book doesn't clip off the left/right screen edges on phones
        const closedDist = camera.aspect < 1.0 ? Math.max(8.6, 4.3 / camera.aspect) : 7.8;
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, closedDist, 0.08);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.35, 0.08);

        // Combine full 360-degree drag rotation with subtle parallax
        const finalRotY = dragRotY + (isDragging ? 0 : mouseParallax.x * 0.15);
        const finalRotX = dragRotX - (isDragging ? 0 : mouseParallax.y * 0.10);
        const finalRotZ = isDragging ? 0 : -mouseParallax.x * 0.04;

        bookGroup.rotation.y = THREE.MathUtils.lerp(bookGroup.rotation.y, finalRotY, 0.12);
        bookGroup.rotation.x = THREE.MathUtils.lerp(bookGroup.rotation.x, finalRotX, 0.12);
        bookGroup.rotation.z = THREE.MathUtils.lerp(bookGroup.rotation.z, finalRotZ, 0.12);

        // Closed cover
        frontCoverPivot.rotation.y = THREE.MathUtils.lerp(frontCoverPivot.rotation.y, 0, 0.1);

        floorShadow.position.x = bookGroup.position.x * 0.5;
        floorShadow.rotation.z = bookGroup.rotation.y * 0.2;
      } else {
        // Open book mode: smoothly centered & camera eases in to frame the warm off-white pages
        bookGroup.position.y = THREE.MathUtils.lerp(bookGroup.position.y, 0.02, 0.08);
        bookGroup.position.x = THREE.MathUtils.lerp(bookGroup.position.x, coverWidth / 2, 0.08);
        bookGroup.position.z = THREE.MathUtils.lerp(bookGroup.position.z, 0.35, 0.08);

        // Dynamic camera distance framing:
        // On mobile in portrait (aspect < 0.85), frames the book comfortably so text is 50%+ larger and easy to read
        const idealDist = camera.aspect < 0.85
          ? Math.min(13.5, Math.max(7.2, 5.8 / camera.aspect))
          : Math.max(6.8, 8.8 / camera.aspect);

        camera.position.z = THREE.MathUtils.lerp(camera.position.z, idealDist, 0.08);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.02, 0.08);

        // Face viewer directly with very subtle mouse perspective
        const targetRotY = mouseParallax.x * 0.04 + dragRotY * 0.08;
        const targetRotX = 0.02 - mouseParallax.y * 0.03;

        bookGroup.rotation.y = THREE.MathUtils.lerp(bookGroup.rotation.y, targetRotY, 0.08);
        bookGroup.rotation.x = THREE.MathUtils.lerp(bookGroup.rotation.x, targetRotX, 0.08);
        bookGroup.rotation.z = THREE.MathUtils.lerp(bookGroup.rotation.z, 0, 0.08);

        // Front cover swings open around the spine hinge (-180 degrees)
        frontCoverPivot.rotation.y = THREE.MathUtils.lerp(frontCoverPivot.rotation.y, -Math.PI, 0.09);

        // 3D Turning Page Animation Frame Step
        if (isPageFlipping) {
          const elapsedFlip = (clock.getElapsedTime() - flipStartTime) / flipDuration;
          const progress = Math.min(1.0, Math.max(0.0, elapsedFlip));
          const eased =
            progress < 0.5
              ? 4 * progress * progress * progress
              : 1 - Math.pow(-2 * progress + 2, 3) / 2;

          if (flipDirection === "forward") {
            turningPivot.rotation.y = -eased * Math.PI;
          } else {
            turningPivot.rotation.y = -Math.PI + eased * Math.PI;
          }

          // Dynamic paper curl as the sheet moves through the air
          const curlFactor = Math.sin(progress * Math.PI);
          const peakCurl = 0.16;
          const posAttr = turnGeom.attributes.position;
          const posArr = posAttr.array as Float32Array;

          for (let i = 0; i < origTurnPositions.length; i += 3) {
            const localX = origTurnPositions[i];
            const xRatio = Math.max(0, localX / pageWidth);
            const zCurl = curlFactor * peakCurl * Math.sin(xRatio * Math.PI * 0.85);
            posArr[i + 2] = origTurnPositions[i + 2] + zCurl;
          }
          posAttr.needsUpdate = true;
          turnGeom.computeVertexNormals();

          if (progress >= 1.0) {
            isPageFlipping = false;
            turningPivot.visible = false;
            activeFromSpread = flipTargetSpread;

            // Reset vertex curl
            for (let i = 0; i < origTurnPositions.length; i += 3) {
              posArr[i + 2] = origTurnPositions[i + 2];
            }
            posAttr.needsUpdate = true;
            turnGeom.computeVertexNormals();

            // Commit final destination textures
            const finalLeft = getLeftTex(flipTargetSpread);
            const finalRight = getRightTex(flipTargetSpread);
            if (finalLeft && leftPageMat) {
              leftPageMat.map = finalLeft;
              leftPageMat.needsUpdate = true;
            }
            if (finalRight && rightPageMat) {
              rightPageMat.map = finalRight;
              rightPageMat.needsUpdate = true;
            }
          }
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseup", onPointerUp);
      window.removeEventListener("touchstart", onPointerDown);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("touchend", onPointerUp);
      window.removeEventListener("touchcancel", onTouchCancel);
      window.removeEventListener("resize", onResize);
      document.body.style.cursor = "default";

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      coveGeometry.dispose();
      coveMaterial.dispose();
      checkerTexture?.dispose();

      coverTex?.dispose();
      spineTex?.dispose();
      backCoverTex?.dispose();
      pagesTex?.dispose();

      frontCoverMat.dispose();
      endpaperMat.dispose();
      spineMat.dispose();
      backCoverMat.dispose();
      pageEdgesMat.dispose();
      coverRimMat.dispose();

      backCoverGeom.dispose();
      spineGeom.dispose();
      pagesGeom.dispose();
      frontCoverGeom.dispose();
      headbandGeom.dispose();
      headbandMat.dispose();
      leftPageGeom.dispose();
      leftPageMat.dispose();
      rightPageGeom.dispose();
      rightPageMat.dispose();
      shadowGeom.dispose();
      shadowMat.dispose();
      turnGeom.dispose();
      turningFrontMat.dispose();
      turningBackMat.dispose();
      leftTexturesCache.forEach((t) => t.dispose());
      rightTexturesCache.forEach((t) => t.dispose());
      backTexturesCache.forEach((t) => t.dispose());
    };
  }, [openBook, nextPage, prevPage, goToSpread]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-auto touch-none"
    />
  );
}
