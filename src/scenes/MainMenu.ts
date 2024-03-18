import { Scene, GameObjects } from 'phaser';
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {getApp} from "firebase/app";

export class MainMenu extends Scene
{
    background: GameObjects.Image;
    title: GameObjects.Text;
    form: GameObjects.DOMElement;

    constructor ()
    {
        super('MainMenu');
    }

    preload()
    {
        this.load.html('loginForm', 'assets/login-form.html');
    }

    create ()
    {
        this.background = this.add.image(512, 384, 'background');
        // this.logo = this.add.image(512, 300, 'logo');
        this.title = this.add.text(512, 200, 'Please login to play', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.form = this.add.dom(512, 768).createFromCache('loginForm');
        this.form.addListener('click');
        this.form.on('click', (event: MouseEvent) =>
        {
            if ((event.target as HTMLInputElement).name === 'loginButton')
            {
                this.signInWithGoogle();
                // const username = this.form.getChildByName('username') as HTMLInputElement;
                // const password = this.form.getChildByName('password') as HTMLInputElement;
                // if (username.value !== '' && password.value !== '')
                // {
                //     this.form.removeListener('click');
                //     this.tweens.add({ targets: this.form.rotate3d, x: 1, w: 90, duration: 2000, ease: 'Power3' });
                //     this.tweens.add({
                //         targets: this.form, scaleX: 2, scaleY: 2, y: 700, duration: 2000, ease: 'Power3',
                //         onComplete: () =>
                //         {
                //             this.form.setVisible(false);
                //             this.scene.start('Game');
                //         }
                //     });
                //     this.title.setText(`Welcome ${username.value}`);
                // }
                // else
                // {
                //     this.tweens.add({ targets: this.title, alpha: 0.1, duration: 200, ease: 'Power3', yoyo: true });
                // }
            }
        });

        this.tweens.add({
            targets: this.form,
            y: 384,
            duration: 2500,
            ease: 'Power3'
        });

        // // Assuming your HTML form has an ID for the email, password, and a login button
        // // Ensure your login-form.html includes the form and button elements correctly
        // loginForm.addListener('click');
        // loginForm.on('click', (event: MouseEvent) => {
        //     console.log(event);
        //     // if (event.target.id === 'login-button') {
        //     //     const email = this.getChildByID('email').value;
        //     //     const password = this.getChildByID('password').value;
        //     //     // Now you can use email and password for authentication logic
        //     //     console.log(email, password);
        //     // }
        // });

        // Listen for clicks on the Google sign-in button
        // document.getElementById('google-sign-in-button').addEventListener('click', () => {
            // Implement your Google sign-in logic here
        // });

        // this.input.once('pointerdown', () => {
        //
        //     this.scene.start('Game');
        //
        // });
    }

    private signInWithGoogle() {
        const app = getApp();
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                this.tweens.add({ targets: this.form.rotate3d, x: 1, w: 90, duration: 2000, ease: 'Power3' });
                this.tweens.add({
                    targets: this.form, scaleX: 2, scaleY: 2, y: 700, duration: 2000, ease: 'Power3',
                    onComplete: () =>
                    {
                        this.form.setVisible(false);
                        this.scene.start('Game');
                    }
                });
                this.title.setText(`Welcome ${result.user.uid}`);
            })
            .catch(() => {
                this.tweens.add({ targets: this.title, alpha: 0.1, duration: 200, ease: 'Power3', yoyo: true });
            });
    }
}
