import Image from "next/image";
import { site } from "@/lib/content";
import styles from "./ProfilePortrait.module.css";

export function ProfilePortrait() {
  return (
    <figure className={styles.portrait}>
      <div className={styles.imageWrap}>
        <Image
          src={site.profileImage.src}
          alt={site.profileImage.alt}
          fill
          sizes="(max-width: 768px) 70vw, 288px"
          loading="eager"
          fetchPriority="high"
          unoptimized
          className={styles.image}
        />
      </div>
      <figcaption className={styles.caption}>
        {site.profileImage.caption}
      </figcaption>
    </figure>
  );
}
