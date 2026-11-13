        const canvas = document.getElementById('swarmCanvas');
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        const triggerArea = document.getElementById('rebuildSwarmTrigger');

        let width, height;
        let particles = [];
        const textToBuild = "DEXO3";

        function setupCanvas() {
            width = canvas.width = 300;
            height = canvas.height = 120;
        }

        class Particle {
            constructor(targetX, targetY) {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.targetX = targetX;
                this.targetY = targetY;
                
                this.vx = (Math.random() - 0.5) * 8;
                this.vy = (Math.random() - 0.5) * 8;
                this.accFactor = 0.05 + Math.random() * 0.03;
                this.friction = 0.82 + Math.random() * 0.06;

                this.size = 1.8 + Math.random() * 1.2;
                this.color = '#38ef7d';
            }

            update() {
                const dx = this.targetX - this.x;
                const dy = this.targetY - this.y;
                
                this.vx += dx * this.accFactor;
                this.vy += dy * this.accFactor;

                this.vx *= this.friction;
                this.vy *= this.friction;

                this.x += this.vx;
                this.y += this.vy;
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function getTargetCoordinates(text) {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 50px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(text, width / 2, height / 2);

            const imageData = ctx.getImageData(0, 0, width, height).data;
            const targets = [];
            const step = 3; // Particle density resolution

            for (let y = 0; y < height; y += step) {
                for (let x = 0; x < width; x += step) {
                    const alphaIndex = (y * width + x) * 4 + 3;
                    if (imageData[alphaIndex] > 128) {
                        targets.push({ x, y });
                    }
                }
            }

            ctx.clearRect(0, 0, width, height);
            return targets;
        }

        function initSwarm() {
            particles = [];
            const targets = getTargetCoordinates(textToBuild);
            targets.forEach(target => {
                particles.push(new Particle(target.x, target.y));
            });
        }

        function animate() {
            ctx.fillStyle = 'rgba(11, 15, 25, 0.3)'; // Trail blur effect
            ctx.fillRect(0, 0, width, height);

            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            requestAnimationFrame(animate);
        }

        setupCanvas();
        initSwarm();
        animate();

        // Rebuild animation when clicking the visual box
        triggerArea.addEventListener('click', () => {
            initSwarm();
        });