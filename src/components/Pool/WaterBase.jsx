import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

function WaterBase() {
    const base = useTexture("/textures/tile2.jpg");
    base.wrapS = base.wrapT = THREE.RepeatWrapping;
    base.repeat.set(10, 10);

    return (
        <>
        <mesh rotation-x={-Math.PI / 2} position={[0, -3, 0]} scale={5}>
            <planeGeometry args={[3, 1]} />
            <meshStandardMaterial color={"#51A9C2"} transparent={true} map={base} opacity={0.1}  />
        </mesh>       
        </>
    )
}

export default WaterBase;